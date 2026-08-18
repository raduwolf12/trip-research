// ── Curated travel apps/tools + general trip tips ────────────────────────────
// Consumer-facing platforms distilled from notes.md, grouped by category for
// the client's "Apps" tab. Kept as plain data (no live fetch) since this is a
// small, slow-changing reference list.

const TOOL_CATEGORIES = [
  {
    key: 'planning',
    label: 'General planning',
    tools: [
      { name: 'trip.com', description: 'General travel platform', url: 'https://trip.com/' },
      { name: 'traveling.com', description: 'General travel platform', url: 'https://traveling.com' },
    ],
  },
  {
    key: 'flights',
    label: 'Flights',
    tools: [
      { name: 'Google Flights', description: 'Fast flight search and price comparison', url: 'https://www.google.com/travel/flights' },
      { name: 'Kiwi', description: 'Strong for flexible search and self-connecting itineraries', url: 'https://www.kiwi.com/' },
      { name: 'Momondo', description: 'Flight search with price insight features', url: 'https://www.momondo.com/' },
      { name: 'Skyscanner', description: 'Broad flight and travel search', url: 'https://www.skyscanner.com/' },
      { name: 'Wego', description: 'Flight and hotel comparison, especially popular in some international markets', url: 'https://www.wego.com/' },
      { name: 'Expedia', description: 'OTA for flights and package bookings', url: 'https://www.expedia.co.uk/' },
      { name: 'Secret Flying', description: 'Mistake fares and cheap flight deals', url: 'https://www.secretflying.com/' },
      { name: 'Going', description: 'Airfare deal alerts', url: 'https://www.going.com/' },
      { name: 'FlightStats', description: 'Flight status, schedules, and airport information', url: 'https://www.flightstats.com/' },
      { name: 'Kayak', description: 'Flight, hotel, and car search with flexible date/price trend tools', url: 'https://www.kayak.com' },
      { name: 'Opodo', description: 'OTA for flights and package bookings', url: 'https://www.opodo.com/' },
    ],
  },
  {
    key: 'overland',
    label: 'Overland transport',
    tools: [
      { name: 'Rome2Rio', description: 'Routes and transport options across multiple modes', url: 'https://www.rome2rio.com/' },
      { name: '12Go', description: 'Strong for Southeast Asia transport bookings', url: 'https://12go.asia/' },
      { name: 'Busbud', description: 'Bus bookings, especially useful in Latin America', url: 'https://www.busbud.com/' },
      { name: 'Bookaway', description: 'Buses, ferries, minibuses, and shuttles', url: 'https://www.bookaway.com/' },
      { name: 'Seat 61', description: 'Detailed global rail travel guidance', url: 'https://www.seat61.com/' },
      { name: 'BlaBlaCar', description: 'Long-distance ridesharing', url: 'https://www.blablacar.com/' },
    ],
  },
  {
    key: 'insurance',
    label: 'Travel insurance',
    tools: [
      { name: 'Heymondo', description: 'Travel insurance with long-stay options', url: 'https://heymondo.com/' },
      { name: 'SafetyWing', description: 'Long-term travel and nomad-focused medical coverage', url: 'https://www.safetywing.com/' },
    ],
  },
  {
    key: 'money',
    label: 'Budget and money',
    tools: [
      { name: 'Budget Your Trip', description: 'Crowd-sourced travel cost estimates', url: 'https://www.budgetyourtrip.com/' },
      { name: 'Revolut', description: 'Travel-friendly card and spending app', url: 'https://www.revolut.com/' },
      { name: 'Wise', description: 'International transfers and low-fee currency conversion', url: 'https://wise.com/' },
      { name: 'Splitwise', description: 'Shared trip expense tracking', url: 'https://www.splitwise.com/' },
    ],
  },
  {
    key: 'accommodation',
    label: 'Accommodation',
    tools: [
      { name: 'Booking.com', description: 'Hotels, apartments, and guesthouses', url: 'https://www.booking.com/' },
      { name: 'Hostelworld', description: 'Hostels and budget stays', url: 'https://www.hostelworld.com/' },
      { name: 'Agoda', description: 'Often useful for accommodation in Asia', url: 'https://www.agoda.com/' },
      { name: 'Airbnb', description: 'Apartments, rooms, and local stays', url: 'https://www.airbnb.com/' },
      { name: 'Tripadvisor', description: 'Accommodation reviews plus things to do and restaurant research', url: 'https://www.tripadvisor.com/' },
    ],
  },
  {
    key: 'maps',
    label: 'Maps and navigation',
    tools: [
      { name: 'Google Maps', description: 'Maps, directions, reviews, and saved places', url: 'https://www.google.com/maps' },
      { name: 'Organic Maps', description: 'Offline maps based on OpenStreetMap', url: 'https://organicmaps.app/' },
      { name: 'AllTrails', description: 'Hiking routes and trail info', url: 'https://www.alltrails.com/' },
      { name: 'Sygic Travel', description: 'Trip planning map for attractions and itineraries', url: 'https://travel.sygic.com/' },
    ],
  },
  {
    key: 'guides',
    label: 'Guides and research',
    tools: [
      { name: 'Wikivoyage', description: 'Community-written travel guides', url: 'https://www.wikivoyage.org/' },
      { name: 'Lonely Planet', description: 'Classic destination guides and travel inspiration', url: 'https://www.lonelyplanet.com/' },
      { name: 'Atlas Obscura', description: 'Unusual and quirky places', url: 'https://www.atlasobscura.com/' },
      { name: 'Reddit Travel', description: 'Community trip advice', url: 'https://www.reddit.com/r/travel/' },
    ],
  },
  {
    key: 'safety',
    label: 'Safety and security',
    tools: [
      { name: 'UK Foreign Travel Advice', description: 'Destination advisories and risk guidance', url: 'https://www.gov.uk/foreign-travel-advice' },
      { name: 'Numbeo Crime Index', description: 'Crowd-sourced safety and crime perception data', url: 'https://www.numbeo.com/crime/' },
      { name: 'Warnely', description: 'Travel safety scores and country risk overview', url: 'https://warnely.com/' },
    ],
  },
  {
    key: 'experiences',
    label: 'Tours and local experiences',
    tools: [
      { name: 'GetYourGuide', description: 'Tours and activities marketplace', url: 'https://www.getyourguide.com/' },
      { name: 'Viator', description: 'Book tours, attractions, and day trips', url: 'https://www.viator.com/' },
      { name: 'Withlocals', description: 'Local guides and experiences', url: 'https://www.withlocals.com/' },
      { name: 'Eatwith', description: 'Dining and food experiences with locals', url: 'https://www.eatwith.com/' },
      { name: 'Klook', description: 'Tours, attraction tickets, and activities — strong coverage in Asia', url: 'https://www.klook.com/' },
    ],
  },
  {
    key: 'connectivity',
    label: 'Trip organization and connectivity',
    tools: [
      { name: 'TripIt', description: 'Organize bookings into a single itinerary', url: 'https://www.tripit.com/' },
      { name: 'Airalo', description: 'Travel eSIMs for mobile data abroad', url: 'https://www.airalo.com/' },
      { name: 'OpenWeather', description: 'Weather forecasts for trip planning', url: 'https://openweathermap.org/' },
    ],
  },
]

// ── Country-specific must-have apps ───────────────────────────────────────
// Western apps (Google Maps, Uber, WhatsApp) quietly stop working or lose
// most of their usefulness in a handful of countries — this fills that gap
// per destination so travelers install the local equivalent before landing,
// not after getting lost. Keyed by ISO2. Only countries with a genuinely
// different app landscape are listed; everywhere else the general "Apps"
// categories above are enough.
const COUNTRY_APPS = {
  CN: [
    { name: 'WeChat', description: 'Messaging, payments, and mini-programs for everything from ordering food to booking trains — the default app in China', url: 'https://www.wechat.com/' },
    { name: 'Alipay', description: 'The other big payment app; the "Tour Pass" feature lets foreign cards work with local QR-code payments', url: 'https://global.alipay.com/' },
    { name: 'Amap (高德地图)', description: 'Far more accurate than Google Maps in China — walking/transit directions, ride-hailing built in', url: 'https://www.amap.com/' },
    { name: 'DiDi', description: 'China\'s Uber — works with international cards and has an English interface', url: 'https://www.didiglobal.com/' },
  ],
  KR: [
    { name: 'KakaoMap', description: 'The map app locals actually use — accurate transit, walking, and driving directions', url: 'https://map.kakao.com/' },
    { name: 'Naver Map', description: 'Alternative to KakaoMap with strong transit routing; some travelers prefer its English mode', url: 'https://map.naver.com/' },
    { name: 'KakaoTalk', description: 'Default messaging app — useful for contacting guesthouses, tours, and local contacts', url: 'https://www.kakaocorp.com/page/service/service/KakaoTalk' },
    { name: 'Papago', description: 'Naver\'s translation app — generally more accurate for Korean than Google Translate', url: 'https://papago.naver.com/' },
  ],
  JP: [
    { name: 'Yahoo! Japan Transit', description: 'Train/subway transfer planner with platform numbers and fares — more detailed than Google Maps for Japan\'s rail network', url: 'https://transit.yahoo.co.jp/' },
    { name: 'LINE', description: 'Japan\'s default messaging app — often needed to contact ryokans, tour guides, and restaurants for reservations', url: 'https://line.me/' },
  ],
  TH: [
    { name: 'Grab', description: 'Ride-hailing, food delivery, and even hotel booking in one app — the regional default across Southeast Asia', url: 'https://www.grab.com/' },
  ],
  VN: [
    { name: 'Grab', description: 'Ride-hailing and food delivery — widely used and safer/cheaper than flagging taxis', url: 'https://www.grab.com/' },
  ],
  SG: [
    { name: 'Grab', description: 'Ride-hailing and food delivery — the dominant app in Singapore', url: 'https://www.grab.com/' },
  ],
  MY: [
    { name: 'Grab', description: 'Ride-hailing and food delivery — the dominant app across Malaysia', url: 'https://www.grab.com/' },
  ],
  ID: [
    { name: 'Gojek', description: 'Ride-hailing, food delivery, and payments — Indonesia\'s equivalent to Grab, often cheaper locally', url: 'https://www.gojek.com/' },
    { name: 'Grab', description: 'Also widely available across Indonesia\'s major cities', url: 'https://www.grab.com/' },
  ],
}

const FLIGHT_TOOLS = TOOL_CATEGORIES.find((c) => c.key === 'flights').tools
const TRAVEL_PLATFORMS = TOOL_CATEGORIES.find((c) => c.key === 'planning').tools

module.exports = { TOOL_CATEGORIES, COUNTRY_APPS, FLIGHT_TOOLS, TRAVEL_PLATFORMS }
