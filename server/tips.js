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
      { name: 'PackPoint', description: 'Weather-aware packing list generator based on your destination and trip length', url: 'https://packpnt.com/' },
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
      { name: 'Kayak', description: 'Flights, stays, car rentals, and package holidays, with flexible date/price trend tools', url: 'https://www.kayak.com' },
      { name: 'Opodo', description: 'OTA for flights and package bookings', url: 'https://www.opodo.com/' },
      { name: 'Hopper', description: 'Tracks flight prices with a color-coded calendar to suggest the best dates to book', url: 'https://www.hopper.com/' },
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
      { name: 'Omio', description: 'Books trains, buses, and flights across Europe with mobile boarding passes', url: 'https://www.omio.com/' },
      { name: 'Flixbus', description: 'Budget long-distance bus network across Europe and beyond', url: 'https://www.flixbus.com/' },
      { name: 'Trainline', description: 'Searches and books train and bus tickets across Europe from one app instead of each rail operator\'s own site', url: 'https://www.thetrainline.com/' },
      { name: 'Turo', description: 'Peer-to-peer car rental — often cheaper than a rental counter and lets you skip the airport line', url: 'https://turo.com/' },
    ],
  },
  {
    key: 'rideshare',
    label: 'Ride-hailing',
    tools: [
      { name: 'Uber', description: 'Ride-hailing available in many major cities worldwide', url: 'https://www.uber.com/' },
      { name: 'Lyft', description: 'Ride-hailing alternative to Uber, mainly in the US and Canada', url: 'https://www.lyft.com/' },
      { name: 'Bolt', description: 'Ride-hailing common across Europe and Africa, often cheaper than Uber', url: 'https://bolt.eu/' },
      { name: 'inDriver', description: 'Ride-hailing where you and the driver negotiate the fare — popular in Latin America and Central Asia', url: 'https://indrive.com/' },
      { name: 'FreeNow', description: 'Bundles taxis, ride-hailing, car rental, and e-scooters into one app across many European cities', url: 'https://www.free-now.com/' },
      { name: 'Cabify', description: 'Ride-hailing with a strong foothold in Latin America and Spain', url: 'https://cabify.com/' },
      { name: 'Careem', description: 'Ride-hailing "super app" (rides, food, payments) across the Middle East, North Africa, and Pakistan', url: 'https://www.careem.com/' },
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
      { name: 'Tricount', description: 'Free group expense splitter with a built-in currency converter', url: 'https://www.tricount.com/' },
      { name: 'XE Currency Converter', description: 'Currency conversion that keeps working offline using the last-fetched rates', url: 'https://www.xe.com/currencyconverter/' },
      { name: 'Venmo', description: 'Peer-to-peer payments and expense splitting, mainly for US-based travelers', url: 'https://venmo.com/' },
      { name: 'Genius Scan', description: 'Scans receipts and documents to a PDF for expense tracking and record-keeping', url: 'https://www.thegrizzlylabs.com/genius-scan' },
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
      { name: 'Maps.me', description: 'Offline GPS navigation, popular for hiking and areas with poor signal', url: 'https://maps.me/' },
      { name: 'Waze', description: 'Driving navigation with live, community-reported traffic, speed cameras, and rerouting', url: 'https://www.waze.com/' },
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
      { name: 'Rick Steves\' Europe App', description: 'Free audio walking tours and guides for major European destinations', url: 'https://www.ricksteves.com/travel-talks/audio-europe' },
      { name: 'Happy Cow', description: 'Finds vegetarian and vegan-friendly restaurants and grocery stores nearby', url: 'https://www.happycow.net/' },
      { name: 'Meetup', description: 'Local events and interest-based groups — a way to meet people and get local tips beyond the guidebook', url: 'https://www.meetup.com/' },
    ],
  },
  {
    key: 'safety',
    label: 'Safety and security',
    tools: [
      { name: 'UK Foreign Travel Advice', description: 'Destination advisories and risk guidance', url: 'https://www.gov.uk/foreign-travel-advice' },
      { name: 'Numbeo Crime Index', description: 'Crowd-sourced safety and crime perception data', url: 'https://www.numbeo.com/crime/' },
      { name: 'Warnely', description: 'Travel safety scores and country risk overview', url: 'https://warnely.com/' },
      { name: 'NordVPN', description: 'VPN for securing your connection on public/hotel Wi-Fi and bypassing local content blocks', url: 'https://nordvpn.com/' },
      { name: 'AirVisual', description: 'Real-time air quality tracking — useful for destinations with heavy pollution or wildfire smoke', url: 'https://www.iqair.com/air-quality-monitors/airvisual' },
      { name: '1Password', description: 'Password manager so losing a device abroad doesn\'t mean losing access to your accounts', url: 'https://1password.com/' },
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
      { name: 'Holafly', description: 'Unlimited-data travel eSIMs — an alternative to Airalo for longer stays', url: 'https://esim.holafly.com/' },
      { name: 'OpenWeather', description: 'Weather forecasts for trip planning', url: 'https://openweathermap.org/' },
    ],
  },
  {
    key: 'communication',
    label: 'Communication and language',
    tools: [
      { name: 'WhatsApp', description: 'The default messaging and calling app in most of the world outside the US — expect to need it', url: 'https://www.whatsapp.com/' },
      { name: 'Google Translate', description: 'Text, voice, and camera translation with offline language packs for when you have no signal', url: 'https://translate.google.com/' },
      { name: 'Duolingo', description: 'Bite-sized lessons to pick up basic phrases before you go', url: 'https://www.duolingo.com/' },
    ],
  },
  {
    key: 'luggage-storage',
    label: 'Luggage storage',
    tools: [
      { name: 'Bounce', description: 'Insured short-term luggage storage at local shops and hotels — handy between checkout and a flight', url: 'https://usebounce.com/' },
      { name: 'Stasher', description: 'Insured luggage storage network, particularly strong around European train stations', url: 'https://stasher.com/' },
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
  AE: [
    { name: 'Careem', description: 'Regional "super app" for rides, food delivery, and payments — often more widely used than Uber locally', url: 'https://www.careem.com/' },
  ],
  SA: [
    { name: 'Careem', description: 'Regional "super app" for rides, food delivery, and payments across Saudi cities', url: 'https://www.careem.com/' },
  ],
  DK: [
    { name: 'Rejseplanen', description: 'Denmark\'s public transport planner — includes trains, buses, and metro', url: 'https://www.rejseplanen.dk/' },
    { name: 'Rejsekort app', description: 'Denmark\'s public transport card app — used for buses, trains, and metro', url: 'https://dinoffentligetransport.dk/en/find-tickets/apps-for-your-journey', ios: 'https://apps.apple.com/dk/app/rejsekort/id6469603787?l=da', android: 'https://play.google.com/store/apps/details?id=dk.rejsekort.digitalrejsekort' },
    { name: 'Rejsebillet app', description: 'Denmark\'s public transport ticket app — used for purchasing tickets for buses, trains, and metro', url: 'https://dinoffentligetransport.dk/en/find-tickets/apps-for-your-journey' },
    { name: 'GoMore', description: 'Carpooling and car rental service — widely used in Denmark', url: 'https://gomore.dk/' },
  ],
}

const FLIGHT_TOOLS = TOOL_CATEGORIES.find((c) => c.key === 'flights').tools
const TRAVEL_PLATFORMS = TOOL_CATEGORIES.find((c) => c.key === 'planning').tools

module.exports = { TOOL_CATEGORIES, COUNTRY_APPS, FLIGHT_TOOLS, TRAVEL_PLATFORMS }
