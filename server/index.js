const { definePlugin } = require('trek-plugin-sdk')

function safeStringify(value) {
  const seen = new WeakSet()
  return JSON.stringify(value, (key, val) => {
    if (typeof val === 'function') return undefined
    if (typeof val === 'object' && val !== null) {
      if (seen.has(val)) return '[Circular]'; seen.add(val)
    }
    return val
  }, 2)
}
function safeJson(status, obj) {
  let body
  try { body = safeStringify(obj) } catch (e) { body = JSON.stringify({ error: e?.message }) }
  return { status, headers: { 'content-type': 'application/json' }, body }
}
async function tryAttempt(fn) {
  try { return await fn() } catch (e) { return { error: e?.message || String(e) } }
}
async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } catch (e) {
    if (e.name === 'AbortError') throw new Error(`Request timed out after ${timeoutMs}ms`)
    throw e
  } finally { clearTimeout(timer) }
}

// ── simple in-memory cache ────────────────────────────────────────────────────
const cache = new Map()
function cached(key, ttlMs, fn) {
  const hit = cache.get(key)
  if (hit && Date.now() - hit.at < ttlMs) return Promise.resolve(hit.value)
  return fn().then((value) => { cache.set(key, { at: Date.now(), value }); return value })
}

// visalist.io is Cloudflare-protected and blocks both server-side fetches
// and cross-origin iframe fetches from an opaque-origin sandbox.
// Using the ilyankou/passport-index-dataset (MIT licensed, Jan 2025 data)
// from raw.githubusercontent.com instead — no auth, no CORS issues.
//Visas up to 2025
const PASSPORT_INDEX_URL_LEGACY = 'https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso2.csv'
//Visas from 2026 onwards
const PASSPORT_INDEX_URL = 'https://raw.githubusercontent.com/imorte/passport-index-data/refs/heads/main/passport-index-tidy-iso2.csv'


let passportDataCache = null
let passportDataFetchedAt = 0
const PASSPORT_CACHE_TTL = 24 * 60 * 60 * 1000

async function getPassportData() {
  if (passportDataCache && Date.now() - passportDataFetchedAt < PASSPORT_CACHE_TTL) {
    return passportDataCache
  }
  const res = await fetchWithTimeout(PASSPORT_INDEX_URL, {
    headers: { 'Accept': 'text/plain' },
  }, 20000)
  if (!res.ok) throw new Error(`passport-index-dataset returned ${res.status}`)
  const text = await res.text()
  const lines = text.split('\n').filter(Boolean)
  // Build a lookup: { 'DK': { 'JP': '90', 'CN': '30', ... }, ... }
  const data = {}
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',')
    if (parts.length < 3) continue
    const passport = parts[0].trim().toUpperCase()
    const dest = parts[1].trim().toUpperCase()
    const req = parts.slice(2).join(',').trim()
    if (!data[passport]) data[passport] = {}
    data[passport][dest] = req
  }
  passportDataCache = data
  passportDataFetchedAt = Date.now()
  return data
}

// ── Emergency telephone numbers — fills gaps in the client's curated list ──
// Unauthenticated GitHub Gist raw file, no CORS/WAF issues.
const EMERGENCY_NUMBERS_URL = 'https://gist.githubusercontent.com/immujahidkhan/58c2e7402ad1df43ac4e03d025d7fed5/raw/9cf238b0fd71e7184970678b0b82e0252336ddd0/List-Of-Emergency-Telephone-Numbers'

let emergencyDataCache = null
let emergencyDataFetchedAt = 0
const EMERGENCY_CACHE_TTL = 24 * 60 * 60 * 1000

function joinNumbers(all) {
  if (!Array.isArray(all)) return null
  const vals = all.filter(Boolean)
  return vals.length ? vals.join(' / ') : null
}

async function getEmergencyData() {
  if (emergencyDataCache && Date.now() - emergencyDataFetchedAt < EMERGENCY_CACHE_TTL) {
    return emergencyDataCache
  }
  const res = await fetchWithTimeout(EMERGENCY_NUMBERS_URL, { headers: { Accept: 'application/json' } }, 20000)
  if (!res.ok) throw new Error(`Emergency numbers gist returned ${res.status}`)
  const list = await res.json()
  const byCountry = {}
  for (const entry of list) {
    const code = entry?.Country?.ISOCode?.toUpperCase()
    if (!code) continue
    byCountry[code] = {
      name: entry.Country.Name,
      police: joinNumbers(entry.Police?.All),
      fire: joinNumbers(entry.Fire?.All),
      ambulance: joinNumbers(entry.Ambulance?.All),
      dispatch: joinNumbers(entry.Dispatch?.All),
      member112: !!entry.Member_112,
      localOnly: !!entry.LocalOnly,
      notes: entry.Notes || null,
    }
  }
  emergencyDataCache = byCountry
  emergencyDataFetchedAt = Date.now()
  return byCountry
}

function interpretRequirement(req) {
  if (!req) return { category: 'Unknown', label: 'Unknown', days: null }
  const r = req.toLowerCase().trim()
  if (r === 'visa required') return { category: 'Visa Required', label: 'Visa Required', days: null }
  if (r === 'visa on arrival') return { category: 'Visa on Arrival', label: 'Visa on Arrival', days: null }
  if (r === 'e-visa') return { category: 'E-Visa', label: 'E-Visa', days: null }
  if (r === 'eta') return { category: 'ETA', label: 'Electronic Travel Auth (ETA)', days: null }
  if (r === 'visa free') return { category: 'Visa Free', label: 'Visa Free', days: null }
  if (r === 'no admission') return { category: 'No Admission', label: 'No Admission', days: null }
  const days = parseInt(r)
  if (!isNaN(days)) return { category: 'Visa Free', label: `Visa Free`, days }
  return { category: 'Other', label: req, days: null }
}

// ── Henley Passport Index — second opinion on visa requirements ─────────────
// Unauthenticated, no CORS/WAF issues (unlike visalist.io). Keyed by the
// traveller's passport (same convention as PASSPORT_INDEX_URL above), one
// request per passport returns every destination bucketed by category.
const HENLEY_CATEGORY_LABELS = {
  visa_free_access: 'Visa Free',
  visa_online: 'E-Visa',
  visa_on_arrival: 'Visa on Arrival',
  visa_required: 'Visa Required',
  electronic_travel_authorisation: 'Electronic Travel Authorisation (ETA)',
}

async function getHenleyVisaData(passport) {
  const url = `https://api.henleypassportindex.com/api/v3/visa-single/${passport}`
  const res = await fetchWithTimeout(url, { headers: { Accept: 'application/json' } }, 15000)
  if (!res.ok) throw new Error(`Henley Passport Index returned ${res.status}`)
  const json = await res.json()
  const byDest = {}
  for (const [key, label] of Object.entries(HENLEY_CATEGORY_LABELS)) {
    for (const entry of (json[key] || [])) {
      if (entry && entry.code) byDest[entry.code.toUpperCase()] = { category: label, name: entry.name }
    }
  }
  return { country: json.country || null, byDest }
}

// Map from country alpha2Code to Nager.Date country code (they mostly match,
// but a handful differ — this covers the common travel destinations)
function toNagerCode(alpha2) {
  const overrides = { 'GB': 'GB', 'US': 'US', 'JP': 'JP', 'CN': 'CN', 'KR': 'KR', 'TW': 'TW' }
  return overrides[alpha2] || alpha2
}

// ── Nager.Date public holidays ────────────────────────────────────────────────
async function fetchHolidays(countryCode, year) {
  const url = `https://date.nager.at/api/v4/Holidays/${countryCode}/${year}`
  const res = await fetchWithTimeout(url, {
    headers: { 'Accept': 'application/json' },
  }, 10000)
  if (res.status === 404) return [] // country not supported — not an error
  if (!res.ok) throw new Error(`Nager.Date returned ${res.status}`)
  return await res.json()
}

// ── Open-Meteo weather forecast ───────────────────────────────────────────────
async function fetchWeather(lat, lon, startDate, endDate, timezone) {
  const today = new Date().toISOString().slice(0, 10)
  const maxForecastDate = new Date(Date.now() + 16 * 86400000).toISOString().slice(0, 10)

  // Determine which endpoint(s) to use:
  // - forecast: up to 16 days from today
  // - archive: historical (up to yesterday)
  // If dates are in the future beyond 16 days, use forecast but drop date range
  // (Open-Meteo will return what it has)
  const effectiveStart = startDate || today
  const effectiveEnd = endDate || maxForecastDate

  let baseUrl = 'https://api.open-meteo.com/v1/forecast'
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code',
    timezone: timezone || 'auto',
    wind_speed_unit: 'ms',
  })

  // forecast_days is mutually exclusive with start_date/end_date on Open-Meteo
  if (effectiveStart < today) {
    baseUrl = 'https://archive-api.open-meteo.com/v1/archive'
    params.set('start_date', effectiveStart)
    params.set('end_date', effectiveEnd < today ? effectiveEnd : today)
  } else if (effectiveStart <= maxForecastDate) {
    params.set('start_date', effectiveStart)
    params.set('end_date', effectiveEnd <= maxForecastDate ? effectiveEnd : maxForecastDate)
  } else {
    // Beyond 16-day window — return current forecast, no date filter
    params.set('forecast_days', '16')
  }


  const res = await fetchWithTimeout(
    `${baseUrl}?${params.toString()}`,
    { headers: { 'Accept': 'application/json' } },
    10000
  )
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Open-Meteo returned ${res.status}${body ? ': ' + body.slice(0, 200) : ''}`)
  }
  return await res.json()
}

// WMO weather code → human readable
function wmoDescription(code) {
  if (code === 0) return 'Clear sky'
  if (code <= 2) return 'Partly cloudy'
  if (code === 3) return 'Overcast'
  if (code <= 49) return 'Fog'
  if (code <= 59) return 'Drizzle'
  if (code <= 69) return 'Rain'
  if (code <= 79) return 'Snow'
  if (code <= 82) return 'Rain showers'
  if (code <= 86) return 'Snow showers'
  if (code <= 99) return 'Thunderstorm'
  return 'Unknown'
}

// ── Nominatim geocode ─────────────────────────────────────────────────────────
async function geocodeCity(city, countryCode) {
  const params = new URLSearchParams({ q: city, format: 'json', limit: '1' })
  if (countryCode) params.set('countrycodes', countryCode.toLowerCase())
  const res = await fetchWithTimeout(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    { headers: { 'User-Agent': 'TREK-trip-research-plugin/0.6.0 (self-hosted, personal use)' } },
    10000
  )
  if (!res.ok) throw new Error(`Nominatim returned ${res.status}`)
  const results = await res.json()
  if (!results.length) return null
  return { lat: parseFloat(results[0].lat), lon: parseFloat(results[0].lon) }
}


// ── Nominatim reverse geocode lat/lon → country code ─────────────────────────
async function reverseGeocodeCountry(lat, lon) {
  const params = new URLSearchParams({ lat: String(lat), lon: String(lon), format: 'json', zoom: '3' })
  const res = await fetchWithTimeout(
    `https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
    { headers: { 'User-Agent': 'TREK-trip-research-plugin/0.5.0 (self-hosted, personal use)' } },
    10000
  )
  if (!res.ok) return null
  const data = await res.json()
  return data?.address?.country_code?.toUpperCase() || null
}

// ── IATA airport code → ISO2 country code ────────────────────────────────────
// Covers the most common international airports. Built from confirmed
// debug output (CPH→DK, OTP→RO, PEK→CN, HND→JP) plus major hubs worldwide.
const IATA_TO_COUNTRY = {
  // Europe
  'CPH':'DK','AAL':'DK','BLL':'DK',
  'ARN':'SE','GOT':'SE','MMX':'SE',
  'OSL':'NO','BGO':'NO','TRD':'NO',
  'HEL':'FI','TMP':'FI',
  'OTP':'RO','CLJ':'RO',
  'LHR':'GB','LGW':'GB','STN':'GB','MAN':'GB','BHX':'GB','EDI':'GB',
  'CDG':'FR','ORY':'FR','LYS':'FR','NCE':'FR','MRS':'FR',
  'FRA':'DE','MUC':'DE','BER':'DE','DUS':'DE','HAM':'DE','STR':'DE',
  'AMS':'NL','EIN':'NL',
  'BRU':'BE','CRL':'BE',
  'MAD':'ES','BCN':'ES','AGP':'ES','PMI':'ES','ALC':'ES','VLC':'ES',
  'FCO':'IT','MXP':'IT','LIN':'IT','VCE':'IT','NAP':'IT','BLQ':'IT',
  'ZRH':'CH','GVA':'CH','BSL':'CH',
  'VIE':'AT','GRZ':'AT','INN':'AT',
  'PRG':'CZ','BRQ':'CZ',
  'WAW':'PL','KRK':'PL','WRO':'PL','GDN':'PL',
  'BUD':'HU','DEB':'HU',
  'ATH':'GR','SKG':'GR','HER':'GR','RHO':'GR','CFU':'GR',
  'IST':'TR','SAW':'TR','ADB':'TR','ESB':'TR','AYT':'TR',
  'SVO':'RU','DME':'RU','VKO':'RU','LED':'RU',
  'KBP':'UA','LWO':'UA','ODS':'UA',
  'TLL':'EE','RIX':'LV','VNO':'LT',
  'LIS':'PT','OPO':'PT','FAO':'PT',
  'DUB':'IE','ORK':'IE',
  'BEG':'RS','TGD':'ME','SKP':'MK','TIA':'AL','SOF':'BG',
  // Asia
  'PEK':'CN','PKX':'CN','PVG':'CN','SHA':'CN','CAN':'CN','SZX':'CN',
  'CTU':'CN','CKG':'CN','WUH':'CN','XIY':'CN','HGH':'CN','NKG':'CN',
  'HND':'JP','NRT':'JP','KIX':'JP','NGO':'JP','CTS':'JP','FUK':'JP',
  'ICN':'KR','GMP':'KR','PUS':'KR',
  'BKK':'TH','DMK':'TH','HKT':'TH','CNX':'TH','USM':'TH',
  'SGN':'VN','HAN':'VN','DAD':'VN','CXR':'VN',
  'SIN':'SG',
  'KUL':'MY','PEN':'MY','BKI':'MY',
  'CGK':'ID','DPS':'ID','SUB':'ID','UPG':'ID',
  'MNL':'PH','CEB':'PH',
  'DEL':'IN','BOM':'IN','MAA':'IN','BLR':'IN','CCU':'IN','HYD':'IN',
  'DAC':'BD','CGP':'BD',
  'KTM':'NP',
  'CMB':'LK',
  'DXB':'AE','AUH':'AE','SHJ':'AE',
  'DOH':'QA',
  'BAH':'BH',
  'MCT':'OM',
  'KWI':'KW',
  'AMM':'JO','AQJ':'JO',
  'BEY':'LB',
  'TLV':'IL',
  'THR':'IR','IKA':'IR',
  'GYD':'AZ','TBS':'GE','EVN':'AM',
  'ALA':'KZ','NQZ':'KZ',
  'TAS':'UZ','SKD':'UZ',
  'ULN':'MN',
  'RGN':'MM',
  'PNH':'KH','REP':'KH',
  'VTE':'LA',
  'TPE':'TW','KHH':'TW',
  'HKG':'HK',
  'MFM':'MO',
  // Americas
  'JFK':'US','EWR':'US','LGA':'US','BOS':'US','ORD':'US','MDW':'US',
  'ATL':'US','MIA':'US','FLL':'US','MCO':'US','TPA':'US',
  'LAX':'US','SFO':'US','SJC':'US','SEA':'US','PDX':'US',
  'DFW':'US','IAH':'US','HOU':'US','DEN':'US','PHX':'US',
  'DTW':'US','MSP':'US','CLT':'US','IAD':'US','BWI':'US','DCA':'US',
  'YYZ':'CA','YVR':'CA','YUL':'CA','YYC':'CA','YEG':'CA','YOW':'CA',
  'MEX':'MX','CUN':'MX','GDL':'MX','MTY':'MX',
  'GRU':'BR','GIG':'BR','BSB':'BR','SSA':'BR','FOR':'BR','REC':'BR',
  'EZE':'AR','AEP':'AR','COR':'AR',
  'SCL':'CL','PMC':'CL',
  'BOG':'CO','MDE':'CO','CTG':'CO',
  'LIM':'PE','CUZ':'PE',
  'UIO':'EC','GYE':'EC',
  'MVD':'UY',
  'ASU':'PY',
  'LPB':'BO',
  'PTY':'PA',
  'SJO':'CR',
  'GUA':'GT',
  'SAL':'SV',
  'TGU':'HN',
  'MGA':'NI',
  'HAV':'CU',
  'SDQ':'DO','PUJ':'DO',
  'SJU':'PR',
  // Africa
  'CAI':'EG','HRG':'EG','SSH':'EG','LXR':'EG',
  'CMN':'MA','RAK':'MA','AGA':'MA','FEZ':'MA',
  'TUN':'TN','MIR':'TN','DJE':'TN',
  'ALG':'DZ','ORN':'DZ',
  'TIP':'LY',
  'ADD':'ET','DIR':'DJ',
  'NBO':'KE','MBA':'KE',
  'DAR':'TZ','ZNZ':'TZ','JRO':'TZ',
  'EBB':'UG',
  'KGL':'RW',
  'LOS':'NG','ABV':'NG','KAN':'NG','PHC':'NG',
  'ACC':'GH',
  'ABJ':'CI',
  'DKR':'SN',
  'CMR':'CM',
  'JNB':'ZA','CPT':'ZA','DUR':'ZA',
  'LAD':'AO',
  'MPM':'MZ',
  'HRE':'ZW',
  'LUN':'ZM',
  'MRU':'MU',
  // Oceania
  'SYD':'AU','MEL':'AU','BNE':'AU','PER':'AU','ADL':'AU','CNS':'AU',
  'AKL':'NZ','CHC':'NZ','WLG':'NZ',
  'NAN':'FJ',
  'PPT':'PF',
}

// ── GDACS live disaster alerts ────────────────────────────────────────────────
const GDACS_URL = 'https://www.gdacs.org/gdacsapi/api/events/geteventlist/EVENTS4APP'
const GDACS_TYPE_LABELS = { EQ: 'Earthquake', FL: 'Flood', TC: 'Tropical Cyclone', WF: 'Wildfire', DR: 'Drought', VO: 'Volcanic Activity', TS: 'Tsunami' }

async function fetchGdacsEvents() {
  const res = await fetchWithTimeout(GDACS_URL, { headers: { 'Accept': 'application/json' } }, 15000)
  if (!res.ok) throw new Error(`GDACS returned ${res.status}`)
  const data = await res.json()
  return Array.isArray(data.features) ? data.features : []
}

function hazardsForCountry(features, countryCode) {
  return features
    .filter((f) => (f.properties?.affectedcountries || []).some((c) => c.iso2 === countryCode))
    .map((f) => {
      const p = f.properties || {}
      return {
        type: p.eventtype,
        typeLabel: GDACS_TYPE_LABELS[p.eventtype] || p.eventtype,
        name: p.name || p.eventname || p.description || 'Unnamed event',
        alertLevel: p.alertlevel || 'Green',
        date: p.fromdate || p.datemodified || null,
        reportUrl: p.url?.report || null,
      }
    })
    .sort((a, b) => (a.date || '') < (b.date || '') ? 1 : -1)
}

// ── Wikivoyage etiquette/tipping (live, wikitext stripped to plain prose) ────
const WIKIVOYAGE_API = 'https://en.wikivoyage.org/w/api.php'

async function wikivoyageApi(params) {
  const qs = new URLSearchParams({ format: 'json', ...params })
  const res = await fetchWithTimeout(`${WIKIVOYAGE_API}?${qs.toString()}`, { headers: { 'Accept': 'application/json' } }, 15000)
  if (!res.ok) throw new Error(`Wikivoyage returned ${res.status}`)
  return await res.json()
}

async function findWikivoyageSections(title, headingNames) {
  const data = await wikivoyageApi({ action: 'parse', page: title, prop: 'sections' })
  if (data.error) return null
  const sections = data.parse?.sections || []
  const found = {}
  for (const name of headingNames) {
    const match = sections.find((s) => (s.line || '').toLowerCase() === name.toLowerCase())
    if (match) found[name] = match.index
  }
  return found
}

async function fetchWikivoyageSectionWikitext(title, index) {
  const data = await wikivoyageApi({ action: 'parse', page: title, prop: 'wikitext', section: index })
  if (data.error) return ''
  return data.parse?.wikitext?.['*'] || ''
}

// Removes {{...}} templates, tracking brace depth since they can nest
// (e.g. an infobox template containing another template as a parameter).
function stripTemplates(text) {
  let out = ''
  let depth = 0
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{' && text[i + 1] === '{') { depth++; i++; continue }
    if (text[i] === '}' && text[i + 1] === '}' && depth > 0) { depth--; i++; continue }
    if (depth === 0) out += text[i]
  }
  return out
}

function stripWikitext(wikitext) {
  if (!wikitext) return ''
  let text = wikitext
  text = text.replace(/<ref[^>]*\/>/gi, '')
  text = text.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '')
  text = stripTemplates(text)
  text = text.replace(/\[\[(File|Image):[^\]]*\]\]/gi, '')
  text = text.replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, (_m, _pipe, display) => display)
  text = text.replace(/\[https?:\/\/[^\s\]]+\s+([^\]]*)\]/g, '$1')
  text = text.replace(/\[https?:\/\/[^\]]*\]/g, '')
  text = text.replace(/'''''/g, '').replace(/'''/g, '').replace(/''/g, '')
  text = text.replace(/<[^>]+>/g, '')
  text = text.replace(/^=+.*=+$/gm, '')
  text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  return text
}

function wikitextToProse(wikitext, opts) {
  const { maxParagraphs = 2, maxBullets = 8, maxParaLen = 500 } = opts || {}
  const lines = stripWikitext(wikitext).split('\n').map((l) => l.trim())
  const bullets = []
  const paragraphs = []
  for (const line of lines) {
    if (!line) continue
    if (line.startsWith('*')) {
      const item = line.replace(/^\*+\s*/, '').trim()
      if (item && bullets.length < maxBullets) bullets.push(item)
      continue
    }
    if (paragraphs.length >= maxParagraphs) continue
    let text = line
    if (text.length > maxParaLen) {
      const cut = text.slice(0, maxParaLen)
      const lastStop = cut.lastIndexOf('. ')
      text = (lastStop > 200 ? cut.slice(0, lastStop + 1) : cut) + '…'
    }
    paragraphs.push(text)
  }
  return { paragraphs, bullets }
}

// "Get in" section wikitext includes its subsections (Transit without a visa,
// Residence Card, Customs, etc) — cut at the first "===" subheading so we only
// keep the visa-relevant intro prose.
function cutBeforeSubsection(wikitext) {
  const match = wikitext.match(/\n===/)
  return match ? wikitext.slice(0, match.index) : wikitext
}

async function getVisaNotes(title) {
  const indices = await findWikivoyageSections(title, ['Get in'])
  if (!indices || indices['Get in'] == null) return { available: false }
  const wikitext = await fetchWikivoyageSectionWikitext(title, indices['Get in'])
  const intro = cutBeforeSubsection(wikitext)
  const { paragraphs, bullets } = wikitextToProse(intro, { maxParagraphs: 3, maxBullets: 8 })
  if (!paragraphs.length && !bullets.length) return { available: false }
  return {
    available: true,
    paragraphs,
    bullets,
    sourceUrl: `https://en.wikivoyage.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}#Get_in`,
  }
}

async function getEtiquette(title) {
  const indices = await findWikivoyageSections(title, ['Respect', 'Tipping'])
  if (!indices || !indices.Respect) return { available: false }
  const respectWikitext = await fetchWikivoyageSectionWikitext(title, indices.Respect)
  const respect = wikitextToProse(respectWikitext, { maxParagraphs: 3, maxBullets: 10 })
  let tipping = null
  if (indices.Tipping) {
    const tippingWikitext = await fetchWikivoyageSectionWikitext(title, indices.Tipping)
    tipping = wikitextToProse(tippingWikitext, { maxParagraphs: 2, maxBullets: 4 })
  }
  return {
    available: true,
    respect,
    tipping,
    sourceUrl: `https://en.wikivoyage.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}#Respect`,
  }
}

// ── traveldoc.aero InfoPages — health & customs advisories, per destination ─
// Unauthenticated and CORS-friendly (unlike the checkpassenger endpoint the
// same provider exposes for airline partners — that one 400s without a
// partner API key/session, so we don't use it). Keyed by ICAO3/alpha-3, so
// alpha-2 country codes are converted via iso3.js first.
const { ISO2_TO_ISO3 } = require('./iso3.js')
const TRAVELDOC_BASE = 'https://infopages.traveldoc.aero'

async function fetchTraveldocSection(kind, iso3) {
  const url = `${TRAVELDOC_BASE}/${kind}/${iso3}/Plain?language=en`
  const res = await fetchWithTimeout(url, { headers: { Accept: 'text/html' } }, 15000)
  if (!res.ok) throw new Error(`traveldoc.aero returned ${res.status}`)
  const html = await res.text()
  // Unknown country codes render an "An unexpected error occurred." shell
  // page instead of a 404. Some valid pages (e.g. Spain's Customs page) skip
  // the <h1> title entirely, so that can't be used as the validity signal.
  if (/An unexpected error occurred/i.test(html)) return null
  return html
}

// Headings/list items carry the structure here (Required Vaccinations,
// Prohibited, etc), so keep line breaks instead of collapsing to prose.
function traveldocHtmlToLines(html) {
  let text = html
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  text = text.replace(/<li[^>]*>/gi, '\n* ')
  text = text.replace(/<h([1-4])[^>]*>/gi, '\n\n## ')
  text = text.replace(/<\/(h1|h2|h3|h4|p|div|ul|ol)>/gi, '\n')
  text = text.replace(/<br\s*\/?>/gi, '\n')
  text = text.replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')
  text = text.replace(/<[^>]+>/g, '')
  text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  return text.split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean)
}

function stripHtmlToText(html) {
  return html.replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/\s+/g, ' ').trim()
}

function parseHeadingCategories(sectionHtml, headingTag) {
  const categories = []
  const re = new RegExp(`<${headingTag}[^>]*>([\\s\\S]*?)</${headingTag}>([\\s\\S]*?)(?=<${headingTag}[^>]*>|$)`, 'gi')
  let m
  while ((m = re.exec(sectionHtml))) {
    const label = stripHtmlToText(m[1])
    if (!label) continue
    const body = m[2]
    const items = []
    const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi
    let lm
    while ((lm = liRe.exec(body))) { const t = stripHtmlToText(lm[1]); if (t) items.push(t) }
    if (!items.length) {
      const pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi
      let pm
      while ((pm = pRe.exec(body))) { const t = stripHtmlToText(pm[1]); if (t) items.push(t) }
    }
    categories.push({ label, items })
  }
  return categories
}

// The Customs page always has a "Free to Import" h3 section right before
// "Prohibited" — this is the duty-free allowance data, just not in the
// curated DUTY_FREE table the client keeps for a handful of countries.
// Most countries list categories (Tobacco, Alcohol, Currency, ...) directly
// as h4 subheadings. EU countries add an extra layer of h4 context headers
// ("When travelling within EU" / "When travelling from outside the EU"),
// each with its own h5 category subheadings underneath.
function extractFreeToImportSection(html) {
  const start = html.match(/<h3[^>]*>\s*Free to Import\s*<\/h3>/i)
  if (!start) return null
  const rest = html.slice(start.index + start[0].length)
  const end = rest.match(/<h3[^>]*>/i)
  const sectionHtml = end ? rest.slice(0, end.index) : rest

  if (/<h5[^>]*>/i.test(sectionHtml)) {
    const groups = []
    const h4Re = /<h4[^>]*>([\s\S]*?)<\/h4>([\s\S]*?)(?=<h4[^>]*>|$)/gi
    let m
    while ((m = h4Re.exec(sectionHtml))) {
      const context = stripHtmlToText(m[1])
      const categories = parseHeadingCategories(m[2], 'h5')
      if (context && categories.length) groups.push({ context, categories })
    }
    return groups.length ? { groups } : null
  }

  const categories = parseHeadingCategories(sectionHtml, 'h4')
  return categories.length ? { groups: [{ context: null, categories }] } : null
}

async function getTraveldocAdvisory(kind, countryCode) {
  const iso3 = ISO2_TO_ISO3[countryCode]
  if (!iso3) return { available: false, message: `No ISO3 mapping for "${countryCode}"` }
  const html = await fetchTraveldocSection(kind, iso3)
  if (!html) return { available: false, message: `No ${kind.toLowerCase()} advisory found for "${countryCode}"` }
  const result = {
    available: true,
    lines: traveldocHtmlToLines(html),
    sourceUrl: `${TRAVELDOC_BASE}/${kind}/${iso3}?language=en`,
  }
  if (kind === 'Customs') {
    const freeToImport = extractFreeToImportSection(html)
    if (freeToImport) result.freeToImport = freeToImport
  }
  return result
}

// ── Electricity/plug override (manual IEC data — see data/electric-plugs.js) ─
const { ELECTRIC_PLUGS, PLUG_TYPE_LETTERS, PLUG_TYPES_LETTERS_PICS } = require('./electric-plugs.js')

function overridePower(countryCode, fallbackPower) {
  const iec = ELECTRIC_PLUGS[countryCode]
  if (!iec) return fallbackPower
  const plugTypeCodes = (iec.plugs || []).filter((p) => PLUG_TYPE_LETTERS[p])
  const plugTypes = plugTypeCodes.map((p) => PLUG_TYPE_LETTERS[p])
  const plugTypePictures = plugTypes.map((letter) => {
    const pic = PLUG_TYPES_LETTERS_PICS[letter]
    return { letter, label: (pic && pic.label) || `Type ${letter}` }
  })
  const plugType = plugTypes.join(' / ')
  return {
    voltage: (iec.voltages || []).join('/') + 'V',
    frequency: (iec.frequencies || []).join('/') + ' Hz',
    plugType: plugType ? 'Type ' + plugType : (fallbackPower && fallbackPower.plugType) || '—',
    plugTypeCodes,
    plugTypes,
    plugTypePictures,
    note: (fallbackPower && fallbackPower.note) || '',
  }
}

// ── OpenFlights airlines dataset ─────────────────────────────────────────────
// Format: id,name,alias,iata,icao,callsign,country,active
// Fetched once and cached in memory — ~100KB, parses in <10ms.
const OPENFLIGHTS_URL = 'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat'
let airlinesCache = null
let airlinesFetchedAt = 0

async function getAirlinesList() {
  if (airlinesCache && Date.now() - airlinesFetchedAt < 24 * 60 * 60 * 1000) return airlinesCache
  const res = await fetchWithTimeout(OPENFLIGHTS_URL, { headers: { 'Accept': 'text/plain' } }, 15000)
  if (!res.ok) throw new Error(`OpenFlights returned ${res.status}`)
  const text = await res.text()
  const airlines = []
  const seen = new Set()
  for (const line of text.split('\n')) {
    if (!line.trim()) continue
    const parts = line.split(',')
    if (parts.length < 8) continue
    const name     = parts[1].replace(/^"|"$/g, '').trim()
    const alias    = parts[2].replace(/^"|"$/g, '').trim()
    const iata     = parts[3].replace(/^"|"$/g, '').trim()
    const icao     = parts[4].replace(/^"|"$/g, '').trim()
    const callsign = parts[5].replace(/^"|"$/g, '').trim()
    const country  = parts[6].replace(/^"|"$/g, '').trim()
    const active   = parts[7].replace(/^"|"$/g, '').trim()
    if (active !== 'Y') continue
    if (!iata || iata === '\\N' || iata === '-') continue
    if (!name || name === '\\N') continue
    if (seen.has(iata)) continue
    seen.add(iata)
    // Searchable string includes alias + callsign so "SAS" finds "Scandinavian Airlines System"
    const searchable = [name, alias, callsign, iata, icao]
      .filter((s) => s && s !== '\\N' && s.length > 1)
      .join(' ').toLowerCase()
    airlines.push({
      name,
      alias: alias !== '\\N' ? alias : null,
      iata,
      callsign: callsign !== '\\N' ? callsign : null,
      country,
      searchable
    })
  }
  airlines.sort((a, b) => a.name.localeCompare(b.name))
  airlinesCache = airlines
  airlinesFetchedAt = Date.now()
  return airlines
}

module.exports = definePlugin({
  async onLoad(ctx) { ctx.log.info('trip-research plugin loaded') },

  routes: [
    // ── debug: inspect raw trip data shape ───────────────────────────────────
    {
      method: 'GET',
      path: '/debug-trip',
      auth: true,
      async handler(req, ctx) {
        const tripId = Number(req.query.tripId)
        if (!tripId) return safeJson(200, { error: 'tripId required' })
        const result = await tryAttempt(async () => {
          const reservations = await ctx.trips.getReservations(tripId)
          // Show the first 3 reservations with all fields so we can see
          // what location contains and whether place_id is populated
          const sample = (reservations || []).slice(0, 3).map((r) => ({
            id: r.id,
            title: r.title,
            type: r.type,
            location: r.location,
            place_id: r.place_id,
            metadata: r.metadata,
          }))
          return { total: (reservations||[]).length, sample }
        })
        return safeJson(200, result)
      },
    },
    // Strategy (in priority order):
    // 1. ctx.trips.getPlaces — broken on this TREK instance (SQL bug) but try anyway
    // 2. ctx.trips.getById — check if the response includes days with assignments
    //    (probe 4 showed assignments include full place objects with lat/lng)
    // 3. Fall back to trip title only if nothing else yields coordinates
    // ── trip-context: extract countries from flight reservation metadata ───────
    // ctx.trips.getPlaces is broken (SQL bug). ctx.trips.getById returns no
    // days/places. But ctx.trips.getReservations returns flight reservations
    // with metadata containing IATA airport codes which map directly to
    // country codes without geocoding. Confirmed from debug output: CPH, OTP,
    // PEK, HND all present in the China+Japan trip flight reservations.
    {
      method: 'GET',
      path: '/trip-context',
      auth: true,
      async handler(req, ctx) {
        const tripId = Number(req.query.tripId)
        if (!tripId) return safeJson(200, { error: 'tripId required' })
        const result = await tryAttempt(async () => {
          const trip = await ctx.trips.getById(tripId)
          const title = trip?.title || trip?.data?.title || ''
          const startDate = trip?.start_date || trip?.data?.start_date || null
          const endDate = trip?.end_date || trip?.data?.end_date || null
          const currency = trip?.currency || trip?.data?.currency || null

          const seen = new Set()
          const detectedCountries = []

          // 3.3.0: getPlaces SQL bug fixed — use actual place coordinates first
          try {
            const raw = await ctx.trips.getPlaces(tripId)
            const arr = Array.isArray(raw) ? raw : (raw?.data || raw?.places || [])
            for (const p of arr) {
              if (p.lat == null || p.lng == null) continue
              const cc = await reverseGeocodeCountry(p.lat, p.lng)
              if (cc && !seen.has(cc)) {
                seen.add(cc)
                detectedCountries.push({ countryCode: cc, name: p.name, source: 'place' })
              }
            }
          } catch (_e) {}
          // Also extract from reservations for transit countries not in places
          const reservations = await ctx.trips.getReservations(tripId)

          for (const r of (reservations || [])) {
            let meta = null
            if (r.metadata) {
              try { meta = typeof r.metadata === 'string' ? JSON.parse(r.metadata) : r.metadata } catch (_e) {}
            }

            // Strategy 1: flight arrival airport IATA → country
            if (meta?.arrival_airport) {
              const cc = IATA_TO_COUNTRY[meta.arrival_airport.toUpperCase()]
              if (cc && !seen.has(cc)) {
                seen.add(cc); detectedCountries.push({ countryCode: cc, name: meta.arrival_airport, source: 'flight' })
              }
            }

            // Strategy 2: train/transit legs — extract destination city names
            if (meta?.legs && Array.isArray(meta.legs)) {
              for (const leg of meta.legs) {
                const dest = leg.to || (leg.to && typeof leg.to === 'object' ? leg.to.name : null)
                if (dest && typeof dest === 'string' && dest.length > 2) {
                  try {
                    const geo = await geocodeCity(dest, '')
                    if (geo) {
                      const cc = await reverseGeocodeCountry(geo.lat, geo.lon)
                      if (cc && !seen.has(cc)) {
                        seen.add(cc); detectedCountries.push({ countryCode: cc, name: dest, source: 'train' })
                      }
                    }
                  } catch (_e) {}
                }
              }
            }

            // Strategy 3: location string — geocode the full address
            if (r.location && typeof r.location === 'string' && r.location.length > 5) {
              try {
                // The location string often ends with ", Country" — extract last part
                const parts = r.location.split(',').map((p) => p.trim()).filter(Boolean)
                const countryPart = parts[parts.length - 1]
                // Try geocoding just the country name part first (faster, more reliable)
                const geo = await geocodeCity(countryPart, '')
                if (geo) {
                  const cc = await reverseGeocodeCountry(geo.lat, geo.lon)
                  if (cc && !seen.has(cc)) {
                    seen.add(cc); detectedCountries.push({ countryCode: cc, name: r.title || countryPart, source: 'location' })
                  }
                }
              } catch (_e) {}
            }
          }


          return { title, startDate, endDate, currency, detectedCountries }
        })
        return safeJson(200, result)
      },
    },
    // ── visa: passport index dataset via raw.githubusercontent.com ────────────
    {
      method: 'GET',
      path: '/visa',
      auth: true,
      async handler(req, ctx) {
        const passport = (req.query.passport || '').trim().toUpperCase()
        const dest = (req.query.dest || '').trim().toUpperCase()
        const title = (req.query.title || '').trim()
        if (!passport) return safeJson(200, { error: 'passport (ISO2 code) required' })
        const result = await tryAttempt(async () => {
          const data = await getPassportData()
          const requirements = data[passport]
          if (!requirements) return { error: `Passport code "${passport}" not found. Use ISO2 codes (e.g. DK, JP, US).` }

          // Second opinion, same passport — Henley categorizes destinations
          // slightly differently (e.g. it splits out ETA from e-visa) and is
          // updated independently of the passport-index-dataset, so the two
          // occasionally disagree on borderline cases.
          let henleyData = null
          try {
            henleyData = await cached(`henley:${passport}`, 24 * 60 * 60 * 1000, () => getHenleyVisaData(passport))
          } catch (_e) { /* best-effort — henley fields stay null below */ }

          if (dest) {
            const req = requirements[dest]
            if (!req) return { error: `No data for destination "${dest}"` }
            let wikivoyage = null
            if (title) {
              wikivoyage = await cached(`visa-notes:${title}`, 24 * 60 * 60 * 1000, () => getVisaNotes(title))
            }
            const henley = henleyData ? (henleyData.byDest[dest] || { category: 'Unknown', name: null }) : null
            return { passport, dest, ...interpretRequirement(req), wikivoyage, henley }
          }
          // Return all destinations
          return {
            passport,
            total: Object.keys(requirements).length,
            visas: Object.entries(requirements).map(([d, r]) => ({
              dest: d,
              ...interpretRequirement(r),
              henley: henleyData ? (henleyData.byDest[d] || { category: 'Unknown', name: null }) : null,
            })),
          }
        })
        return safeJson(200, result)
      },
    },

    // ── holidays: public holidays for a country + year range ─────────────────
    {
      method: 'GET',
      path: '/holidays',
      auth: true,
      async handler(req, ctx) {
        const countryCode = (req.query.countryCode || '').toUpperCase()
        const startDate = req.query.startDate // YYYY-MM-DD
        const endDate = req.query.endDate
        if (!countryCode) return safeJson(200, { error: 'countryCode required' })

        const result = await tryAttempt(async () => {
          const years = new Set()
          if (startDate) years.add(parseInt(startDate.slice(0, 4)))
          if (endDate) years.add(parseInt(endDate.slice(0, 4)))
          if (!years.size) years.add(new Date().getFullYear())

          const all = []
          for (const year of years) {
            const holidays = await cached(
              `holidays:${countryCode}:${year}`,
              24 * 60 * 60 * 1000,
              () => fetchHolidays(toNagerCode(countryCode), year)
            )
            all.push(...holidays)
          }

          // Filter to trip date range if provided
          const filtered = (startDate || endDate)
            ? all.filter((h) => {
                if (startDate && h.date < startDate) return false
                if (endDate && h.date > endDate) return false
                return true
              })
            : all

          return {
            countryCode,
            total: filtered.length,
            holidays: filtered.map((h) => ({
              date: h.date,
              name: h.name,
              localName: h.localName,
              national: h.nationalHoliday,
              types: h.holidayTypes,
            })),
          }
        })
        return safeJson(200, result)
      },
    },

    // ── weather: forecast for a destination city or lat/lon ──────────────────
    {
      method: 'GET',
      path: '/weather',
      auth: true,
      async handler(req, ctx) {
        const city = (req.query.city || '').trim()
        const countryCode = (req.query.countryCode || '').toUpperCase()
        const startDate = req.query.startDate
        const endDate = req.query.endDate
        const latParam = req.query.lat ? parseFloat(req.query.lat) : null
        const lonParam = req.query.lon ? parseFloat(req.query.lon) : null
        if (!city && (latParam == null || lonParam == null)) return safeJson(200, { error: 'city or lat/lon required' })

        const result = await tryAttempt(async () => {
          let geo = null
          if (latParam != null && lonParam != null) {
            geo = { lat: latParam, lon: lonParam }
          } else {
            geo = await cached(
              `geo:${city}:${countryCode}`,
              7 * 24 * 60 * 60 * 1000,
              () => geocodeCity(city, countryCode || 'world')
            )
          }
          if (!geo) return { error: `Could not geocode "${city}"` }

          const weather = await fetchWeather(geo.lat, geo.lon, startDate, endDate, 'auto')
          const daily = weather.daily
          const days = (daily.time || []).map((date, i) => ({
            date,
            maxTemp: daily.temperature_2m_max?.[i] ?? null,
            minTemp: daily.temperature_2m_min?.[i] ?? null,
            precipitation: daily.precipitation_sum?.[i] ?? null,
            description: wmoDescription(daily.weather_code?.[i] ?? 0),
            code: daily.weather_code?.[i] ?? 0,
          }))

          const today = new Date().toISOString().slice(0, 10)
          const maxForecastDate = new Date(Date.now() + 16 * 86400000).toISOString().slice(0, 10)
          const requestedStart = startDate || today
          const isBeyondForecast = requestedStart > maxForecastDate
          const isHistorical = startDate && startDate < today

          return {
            city, lat: geo.lat, lon: geo.lon, days,
            note: isBeyondForecast
              ? `Trip dates (${startDate}) are beyond the 16-day forecast window — showing current forecast instead. Check back closer to your trip.`
              : isHistorical ? `Showing historical weather data.` : null,
          }
        })
        return safeJson(200, result)
      },
    },

    // ── trip dates helper ─────────────────────────────────────────────────────
    {
      method: 'GET',
      path: '/trip-info',
      auth: true,
      async handler(req, ctx) {
        const tripId = Number(req.query.tripId)
        if (!tripId) return safeJson(200, { error: 'tripId required' })
        const result = await tryAttempt(async () => {
          const trip = await ctx.trips.getById(tripId)
          return {
            title: trip?.title || trip?.data?.title,
            startDate: trip?.start_date || trip?.data?.start_date || null,
            endDate: trip?.end_date || trip?.data?.end_date || null,
            currency: trip?.currency || trip?.data?.currency || null,
          }
        })
        return safeJson(200, result)
      },
    },

    // ── duty-free: per-trip country list stored in meta ──────────────────────
    {
      method: 'GET',
      path: '/duty-free/countries',
      auth: true,
      async handler(req, ctx) {
        const tripId = Number(req.query.tripId)
        if (!tripId) return safeJson(200, { error: 'tripId required' })
        const result = await tryAttempt(async () => {
          const row = await ctx.meta.get('trip', tripId, 'duty_free_countries')
          const countries = row ? JSON.parse(typeof row === 'string' ? row : row.value) : []
          return { countries: Array.isArray(countries) ? countries : [] }
        })
        return safeJson(200, result)
      },
    },
    {
      method: 'POST',
      path: '/duty-free/countries',
      auth: true,
      async handler(req, ctx) {
        const tripId = Number(req.body?.tripId)
        const countries = Array.isArray(req.body?.countries) ? req.body.countries : []
        if (!tripId) return safeJson(200, { error: 'tripId required' })
        const result = await tryAttempt(async () => {
          const clean = [...new Set(countries.map((c) => String(c).toUpperCase()).filter((c) => /^[A-Z]{2}$/.test(c)))]
          await ctx.meta.set('trip', tripId, 'duty_free_countries', JSON.stringify(clean))
          return { countries: clean }
        })
        return safeJson(200, result)
      },
    },

    // ── luggage: per-trip traveler entries stored in meta ────────────────────
    {
      method: 'GET',
      path: '/luggage/entries',
      auth: true,
      async handler(req, ctx) {
        const tripId = Number(req.query.tripId)
        if (!tripId) return safeJson(200, { error: 'tripId required' })
        const result = await tryAttempt(async () => {
          const row = await ctx.meta.get('trip', tripId, 'luggage_entries')
          const entries = row ? JSON.parse(typeof row === 'string' ? row : row.value) : []
          return { entries: Array.isArray(entries) ? entries : [] }
        })
        return safeJson(200, result)
      },
    },
    {
      method: 'POST',
      path: '/luggage/entries',
      auth: true,
      async handler(req, ctx) {
        const tripId = Number(req.body?.tripId)
        const entries = Array.isArray(req.body?.entries) ? req.body.entries : []
        if (!tripId) return safeJson(200, { error: 'tripId required' })
        const result = await tryAttempt(async () => {
          const clean = entries
            .map((e) => ({ name: String(e.name || '').slice(0, 60).trim(), airline: String(e.airline || '').slice(0, 60).trim() }))
            .filter((e) => e.name && e.airline)
            .slice(0, 50)
          await ctx.meta.set('trip', tripId, 'luggage_entries', JSON.stringify(clean))
          return { entries: clean }
        })
        return safeJson(200, result)
      },
    },

    // ── auto-detect airlines from flight reservations (3.3.0) ────────────────
    // Returns unique airline names from the trip's flight reservations,
    // ready to populate the luggage tab without manual entry.
    {
      method: 'GET',
      path: '/luggage/auto-airlines',
      auth: true,
      async handler(req, ctx) {
        const tripId = Number(req.query.tripId)
        if (!tripId) return safeJson(200, { error: 'tripId required' })
        const result = await tryAttempt(async () => {
          const reservations = await ctx.trips.getReservations(tripId)
          const rawNames = []
          const seen = new Set()
          for (const r of (reservations || [])) {
            if (r.type !== 'flight' || !r.metadata) continue
            let meta = null
            try { meta = typeof r.metadata === 'string' ? JSON.parse(r.metadata) : r.metadata } catch (_e) {}
            if (meta?.airline) {
              const name = String(meta.airline).trim()
              if (name && !seen.has(name.toLowerCase())) {
                seen.add(name.toLowerCase())
                rawNames.push(name)
              }
            }
          }

          // Enrich: match each raw name against the OpenFlights dataset so
          // "SAS" → "Scandinavian Airlines System" (SK) and we return both
          // the canonical name AND the raw name so the client can match either
          let enriched = rawNames.map((raw) => ({ raw, canonical: raw, iata: null }))
          try {
            const allAirlines = await getAirlinesList()
            enriched = rawNames.map((raw) => {
              const q = raw.toLowerCase()
              const match = allAirlines.find((a) =>
                a.iata.toLowerCase() === q ||
                a.name.toLowerCase() === q ||
                (a.callsign && a.callsign.toLowerCase() === q) ||
                (a.alias && a.alias.toLowerCase().includes(q)) ||
                a.searchable.includes(q)
              )
              return match
                ? { raw, canonical: match.name, iata: match.iata }
                : { raw, canonical: raw, iata: null }
            })
          } catch (_e) {}

          return { airlines: enriched }
        })
        return safeJson(200, result)
      },
    },

    // ── airlines search: OpenFlights dataset (~1000 active carriers) ──────────
    // Parsed and cached server-side. Client sends a query string, returns
    // matching airlines with IATA code so the luggage tab has a real searchable
    // airline list instead of a 20-entry hardcoded dropdown.
    {
      method: 'GET',
      path: '/airlines/search',
      auth: true,
      async handler(req, ctx) {
        const query = (req.query.q || '').trim().toLowerCase()
        const detectedParam = (req.query.detected || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
        const result = await tryAttempt(async () => {
          const airlines = await getAirlinesList()

          let matches
          if (query) {
            // Use the pre-built searchable string so "SAS" finds "Scandinavian Airlines System"
            matches = airlines.filter((a) => a.searchable.includes(query)).slice(0, 50)
          } else if (detectedParam.length) {
            // No query — show detected trip airlines first, then popular carriers
            const POPULAR = ['SK','W6','FR','U2','DY','LH','KL','AF','BA','EK','QR','TK','CA','NH','JL','SQ','QF','CX','UA','AA','DL']
            const detected = airlines.filter((a) =>
              detectedParam.some((d) => a.name.toLowerCase().includes(d) || a.iata.toLowerCase() === d || (a.callsign||'').toLowerCase() === d)
            )
            const popular = POPULAR.map((code) => airlines.find((a) => a.iata === code)).filter(Boolean)
            const seenIata = new Set([...detected.map((a) => a.iata), ...popular.map((a) => a.iata)])
            matches = [...detected, ...popular, ...airlines.filter((a) => !seenIata.has(a.iata)).slice(0, 20)]
          } else {
            // Empty — show popular carriers
            const POPULAR = ['SK','W6','FR','U2','DY','LH','KL','AF','BA','EK','QR','TK','CA','NH','JL','SQ','QF','CX','UA','AA','DL']
            matches = POPULAR.map((code) => airlines.find((a) => a.iata === code)).filter(Boolean)
          }
          return { airlines: matches.slice(0, 50) }
        })
        return safeJson(200, result)
      },
    },
    // ── static destination briefing: no AI, no API — pure curated data ────────
    {
      method: 'GET',
      path: '/briefing',
      auth: true,
      async handler(req, ctx) {
        const countryCode = (req.query.country || '').toUpperCase()
        const section = (req.query.section || 'all')
        if (!countryCode) return safeJson(200, { error: 'country required' })

        const { DESTINATION_DATA } = require('./destinations.js')
        const dest = DESTINATION_DATA[countryCode] || null
        const curatedAvailable = !!dest

        // Connectivity's power/plug info can come from data/electric-plugs.js
        // even when there's no curated destinations.js entry at all — never
        // mutate dest in place, it's the shared, cached DESTINATION_DATA singleton.
        const connectivity = {
          ...(dest?.connectivity || {}),
          power: overridePower(countryCode, dest?.connectivity?.power),
        }

        if (section === 'all') {
          return safeJson(200, {
            available: true,
            curatedAvailable,
            country: countryCode,
            name: dest?.name || null,
            availableCountries: Object.keys(DESTINATION_DATA),
            ...(dest || {}),
            connectivity,
          })
        }
        if (section === 'connectivity') {
          return safeJson(200, { available: true, curatedAvailable, country: countryCode, name: dest?.name || null, section, data: connectivity })
        }
        if (!dest || !dest[section]) {
          return safeJson(200, { available: false, curatedAvailable, country: countryCode, section, message: `No curated '${section}' data for ${countryCode} yet.` })
        }
        return safeJson(200, { available: true, curatedAvailable, country: countryCode, name: dest.name, section, data: dest[section] })
      },
    },

    // ── hazards: live current disaster alerts from GDACS, per country ────────
    {
      method: 'GET',
      path: '/hazards',
      auth: true,
      async handler(req, ctx) {
        const countryCode = (req.query.country || '').toUpperCase()
        if (!countryCode) return safeJson(200, { error: 'country required' })
        const result = await tryAttempt(async () => {
          const features = await cached('gdacs:events', 30 * 60 * 1000, fetchGdacsEvents)
          const events = hazardsForCountry(features, countryCode)
          return { country: countryCode, total: events.length, events, source: 'GDACS (gdacs.org) — live current alerts' }
        })
        return safeJson(200, result)
      },
    },

    // ── etiquette: live Respect/Tipping prose from Wikivoyage ─────────────────
    {
      method: 'GET',
      path: '/etiquette',
      auth: true,
      async handler(req, ctx) {
        const title = (req.query.title || '').trim()
        if (!title) return safeJson(200, { error: 'title required' })
        const result = await tryAttempt(async () => {
          const data = await cached(`etiquette:${title}`, 24 * 60 * 60 * 1000, () => getEtiquette(title))
          if (!data.available) return { available: false, title, message: `No Wikivoyage "Respect" section found for "${title}".` }
          return { available: true, title, ...data }
        })
        return safeJson(200, result)
      },
    },

    // ── health/customs: live traveldoc.aero advisories per destination ───────
    {
      method: 'GET',
      path: '/travel-health',
      auth: true,
      async handler(req, ctx) {
        const countryCode = (req.query.country || '').trim().toUpperCase()
        if (!countryCode) return safeJson(200, { error: 'country (ISO2 code) required' })
        const result = await tryAttempt(async () => {
          const data = await cached(`travelhealth:${countryCode}`, 24 * 60 * 60 * 1000, () => getTraveldocAdvisory('Health', countryCode))
          return { country: countryCode, ...data }
        })
        return safeJson(200, result)
      },
    },
    {
      method: 'GET',
      path: '/travel-customs',
      auth: true,
      async handler(req, ctx) {
        const countryCode = (req.query.country || '').trim().toUpperCase()
        if (!countryCode) return safeJson(200, { error: 'country (ISO2 code) required' })
        const result = await tryAttempt(async () => {
          const data = await cached(`travelcustoms:${countryCode}`, 24 * 60 * 60 * 1000, () => getTraveldocAdvisory('Customs', countryCode))
          return { country: countryCode, ...data }
        })
        return safeJson(200, result)
      },
    },

    // ── emergency numbers: fills gaps outside the client's curated list ──────
    {
      method: 'GET',
      path: '/emergency-numbers',
      auth: true,
      async handler(req, ctx) {
        const countryCode = (req.query.country || '').trim().toUpperCase()
        if (!countryCode) return safeJson(200, { error: 'country (ISO2 code) required' })
        const result = await tryAttempt(async () => {
          const byCountry = await getEmergencyData()
          const entry = byCountry[countryCode]
          if (!entry) return { available: false, country: countryCode, message: `No emergency number data for "${countryCode}"` }
          return { available: true, country: countryCode, ...entry, sourceUrl: EMERGENCY_NUMBERS_URL }
        })
        return safeJson(200, result)
      },
    },

  ],
})