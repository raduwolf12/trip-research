// ── Static destination briefing dataset ──────────────────────────────────────
// Covers 50+ major travel destinations. Each entry has sections:
// overview, safety, health, culture, connectivity
// Sources: IATA Travel Centre, CDC/WHO, Numbeo, Wikipedia, official tourism boards

const DESTINATION_DATA = {

  JP: {
    name: 'Japan',
    overview: {
      whyNow: {
        title: 'Why visit',
        body: 'Japan blends ancient temples, cutting-edge cities, and stunning nature. Autumn (Oct–Nov) brings vivid foliage across the country; spring (Mar–Apr) is famous for cherry blossoms. Outside peak seasons, crowds are manageable and prices lower.',
      },
      bestFor: ['Autumn foliage (Nikko, Kyoto, Arashiyama)', 'Onsen hot-spring towns (Hakone, Beppu)', 'Street food: ramen, sushi, takoyaki', 'Shinkansen rail journeys', 'Temples, shrines, and castles'],
      headsUp: ['Golden Week (late Apr–early May) — avoid or book far ahead', 'Sports Day weekend in October — book trains early', 'Halloween in Shibuya draws very large street crowds', 'Typhoon season Jul–Sep; tail-end possible early October'],
    },
    safety: {
      advisory: { level: 1, levelText: 'Exercise normal precautions', body: 'Japan is consistently one of the safest destinations in the world for travelers.' },
      crimeIndex: '22 · Low',
      soloTravel: 'Very safe',
      naturalRisk: 'Earthquakes / typhoons',
      naturalHazards: ['Install NHK World and Yurekuru for earthquake alerts', 'Follow green evacuation signs in coastal/low-lying areas', 'Typhoon season peaks Aug–Sep; check JMA forecasts', 'Volcanic activity monitored at JMA — check before hiking Aso or Sakurajima'],
      scams: ['Overpriced "English menus" in tourist-heavy areas like Asakusa', 'Fake monks collecting donations in major cities'],
    },
    health: {
      vaccines: { routine: 'Up to date', hepatitisA: 'Recommended', otherVaccine: 'Japanese Encephalitis', otherVaccineNote: 'Rural stays only' },
      tapWater: 'Safe to drink',
      mosquitoRisk: 'Low',
      waterFood: ['Tap water safe nationwide — one of the cleanest in the world', 'Raw fish and eggs held to extremely high food-safety standards', 'Fugu (pufferfish) only at licensed restaurants'],
      healthcare: ['Excellent healthcare — world-class hospitals in cities', 'Travel insurance strongly recommended — care is pricey for uninsured', 'AMDA Medical Info Center: 03-6233-9266 (multilingual)', 'Pharmacies (薬局) close early; convenience stores stock basics'],
    },
    culture: {
      etiquette: [
        { do: 'Bow when greeting', dont: 'Handshakes with strangers' },
        { do: 'Remove shoes indoors', dont: 'Wear outdoor shoes on tatami' },
        { do: 'Queue quietly on platforms', dont: 'Talk loudly on trains' },
        { do: 'Use two hands for cards and gifts', dont: 'Pass food chopstick-to-chopstick' },
        { do: 'Slurp noodles — it\'s a compliment', dont: 'Stick chopsticks upright in rice' },
        { do: 'Cash for small shops', dont: 'Tip — it can offend' },
      ],
      tipping: 'Tipping is not part of the culture and may be politely returned. Service charge (お通し / seki-ryō) is sometimes added at izakaya. Round numbers and quiet gratitude are the norm.',
      phrases: [
        { phrase: 'すみません (Sumimasen)', meaning: 'Excuse me / Sorry' },
        { phrase: 'ありがとう (Arigatō)', meaning: 'Thank you' },
        { phrase: 'どこですか (Doko desu ka)', meaning: 'Where is…?' },
        { phrase: 'いくらですか (Ikura desu ka)', meaning: 'How much is this?' },
        { phrase: 'トイレはどこ (Toire wa doko)', meaning: 'Where is the toilet?' },
      ],
    },
    connectivity: {
      online: [
        { type: 'eSIM', detail: 'Ubigi / Airalo 10 GB/30d ≈ ¥3,200. Works at airport on arrival.' },
        { type: 'Pocket WiFi', detail: 'Airport rental ¥600–900/day. Good for groups sharing data.' },
        { type: 'Public WiFi', detail: 'Free at stations, konbini (7-Eleven, FamilyMart) and Starbucks. Register via email once.' },
        { type: 'Roaming', detail: 'Check partner rates — often more expensive than an eSIM.' },
      ],
      power: { voltage: '100V', frequency: '50/60 Hz', plugType: 'Type A', note: 'Most modern electronics accept 100–240V. Hair-dryers and shavers may run slow — check the label.' },
    },
    transport: {
      gettingAround: [
        { type: 'Shinkansen', detail: 'Bullet trains link major cities. Tokyo→Kyoto in 2h15. JR Pass worth it for 2+ cities.' },
        { type: 'Suica / Pasmo IC', detail: 'Tap card for trains, buses, konbini. Loads into Apple/Google Wallet.' },
        { type: 'City subways', detail: 'Punctual to the minute. Last trains around 00:00–00:30.' },
        { type: 'Taxi / rideshare', detail: 'Uber works in Tokyo. Doors open automatically — do not touch them.' },
      ],
      airportArrivals: ['Narita Express to Shinjuku: ~80 min, ¥3,250', 'Haneda Monorail to Hamamatsuchō: ~15 min, ¥520', 'Airport limousine buses to major hotels: ¥1,000–3,600'],
    },
    food: {
      mustTry: ['Ramen (regional styles vary hugely)', 'Fresh sushi at Tsukiji Outer Market', 'Takoyaki and okonomiyaki in Osaka', 'Wagyu beef — best in Kobe and Kyoto', 'Matcha everything — ice cream, KitKat, lattes'],
      avoid: ['Food waste — take only what you will eat', 'Eating while walking (considered rude)'],
      dietary: 'Vegetarian/vegan can be tricky — dashi (fish stock) is in many dishes. Look for "精進料理" (shōjin ryōri) Buddhist cuisine.',
    },
  },

  CN: {
    name: 'China',
    overview: {
      whyNow: { title: 'Why visit', body: 'China offers extraordinary range: the Great Wall, Forbidden City, karst mountains of Guilin, and ultra-modern Shanghai. Autumn (Sep–Nov) and spring (Mar–May) are the most comfortable seasons; summer is hot and rainy in many regions.' },
      bestFor: ['Great Wall day trips from Beijing', 'The Forbidden City and hutong alleys', 'High-speed rail network — fastest in the world', 'Sichuan food and giant pandas in Chengdu', 'West Lake scenery in Hangzhou'],
      headsUp: ['Golden Week (Oct 1–7 and Jan/Feb Spring Festival) — extreme crowds', 'VPN required for Google, WhatsApp, Instagram — download before arrival', 'Air quality varies — check AQI for Beijing and Shanghai', 'Cashless society — WeChat Pay or Alipay needed; get tourist card at airport'],
    },
    safety: {
      advisory: { level: 1, levelText: 'Exercise normal precautions', body: 'China is generally safe for tourists in major cities; petty theft exists in crowded tourist areas.' },
      crimeIndex: '31 · Low–Medium',
      soloTravel: 'Safe with preparation',
      naturalRisk: 'Earthquakes (southwest) / typhoons (coast)',
      naturalHazards: ['Sichuan and Yunnan provinces have seismic activity', 'Typhoon season affects coastal areas Jun–Oct', 'Flash floods in mountainous regions during summer'],
      scams: ['Tea ceremony scam — friendly strangers invite you for "tea", bill is enormous', 'Fake art students selling "their work" at inflated prices', 'Counterfeit goods sold as genuine in tourist markets'],
    },
    health: {
      vaccines: { routine: 'Up to date', hepatitisA: 'Recommended', otherVaccine: 'Hepatitis B', otherVaccineNote: 'Recommended for longer stays' },
      tapWater: 'Do not drink — bottled water universally used',
      mosquitoRisk: 'Low–Medium (varies by region)',
      waterFood: ['Never drink tap water — bottled water everywhere and cheap', 'Street food generally safe from busy stalls with high turnover', 'Avoid raw shellfish in non-coastal cities'],
      healthcare: ['Large cities have international hospitals with English-speaking staff', 'Beijing United Family Hospital: +86-10-5927-7000', 'Travel insurance essential — top-up card for international clinics needed'],
    },
    culture: {
      etiquette: [
        { do: 'Accept business cards with both hands', dont: 'Write in red ink (associated with death)' },
        { do: 'Bring gifts when visiting homes', dont: 'Give clocks as gifts (means "death")' },
        { do: 'Slurping and loud eating is fine', dont: 'Stick chopsticks upright in rice' },
        { do: 'Bargain at markets', dont: 'Bargain in fixed-price shops' },
        { do: 'Dress modestly at temples', dont: 'Show affection publicly' },
        { do: 'Download WeChat before arrival', dont: 'Expect Google/WhatsApp to work' },
      ],
      tipping: 'Tipping is not customary and can cause confusion. High-end international hotels and restaurants may add a 10–15% service charge automatically.',
      phrases: [
        { phrase: '你好 (Nǐ hǎo)', meaning: 'Hello' },
        { phrase: '谢谢 (Xièxiè)', meaning: 'Thank you' },
        { phrase: '多少钱 (Duōshǎo qián)', meaning: 'How much?' },
        { phrase: '厕所在哪 (Cèsuǒ zài nǎ)', meaning: 'Where is the toilet?' },
        { phrase: '不辣 (Bù là)', meaning: 'Not spicy please' },
      ],
    },
    connectivity: {
      online: [
        { type: 'eSIM', detail: 'China Unicom / Airalo. Get a VPN before arrival — install it at home.' },
        { type: 'Tourist SIM', detail: 'Available at airports. China Mobile/Unicom offer tourist plans with data.' },
        { type: 'Public WiFi', detail: 'Available in hotels, Starbucks and malls. Requires phone number registration.' },
        { type: 'VPN', detail: 'Essential — download and test before flying. ExpressVPN / NordVPN work well.' },
      ],
      power: { voltage: '220V', frequency: '50 Hz', plugType: 'Type A / C / I', note: 'Type A (US-style flat pins) is most common. Adapters available everywhere cheaply.' },
    },
    transport: {
      gettingAround: [
        { type: 'High-speed rail (HSR)', detail: 'World\'s largest network. Beijing→Shanghai in 4.5h. Book on Trip.com or 12306.' },
        { type: 'Metro', detail: 'Major cities have extensive, cheap, clean metro systems. Use mobile payment.' },
        { type: 'DiDi', detail: 'Chinese Uber — essential app. Works with international cards.' },
        { type: 'Domestic flights', detail: 'Cheap for long distances. Budget extra time for security.' },
      ],
      airportArrivals: ['Beijing Capital/Daxing: Airport Express to city center ~25 min, ¥35', 'Shanghai Pudong: Maglev to Longyang Rd ~8 min, ¥50; then metro', 'Taxi lines at all major airports — avoid unlicensed drivers'],
    },
    food: {
      mustTry: ['Peking Duck in Beijing', 'Dim sum in Shanghai or Guangzhou', 'Mapo tofu and hotpot in Chengdu', 'Xiaolongbao (soup dumplings)', 'Lanzhou beef noodle soup'],
      avoid: ['Drinking tap water', 'Ice in drinks outside international hotels'],
      dietary: 'Vegetarian options plentiful at Buddhist temples. Halal (清真) food widely available. Show a dietary card — apps like Pleco have food allergy phrases.',
    },
  },

  MN: {
    name: 'Mongolia',
    overview: {
      whyNow: { title: 'Why visit', body: 'Mongolia offers vast, virtually untouched steppe, the Gobi Desert, and nomadic culture. Summer (Jun–Aug) is peak season with the Naadam festival in July. Autumn brings golden landscapes; winters are extreme (-30°C possible).' },
      bestFor: ['Riding horses on the steppe', 'Gobi Desert camel treks', 'Naadam Festival (wrestling, archery, horse racing) in July', 'Staying in a genuine ger (yurt) with nomadic families', 'Terelj National Park'],
      headsUp: ['Naadam week (Jul 11–13) — Ulaanbaatar is very busy and expensive', 'Roads outside cities are unpaved tracks — 4WD essential', 'Dzud (harsh winter) can affect livestock and travel Nov–Mar', 'Limited ATMs outside Ulaanbaatar — carry enough cash'],
    },
    safety: {
      advisory: { level: 1, levelText: 'Exercise normal precautions', body: 'Mongolia is generally safe. Petty theft occurs in Ulaanbaatar; rural areas are very safe.' },
      crimeIndex: '38 · Medium',
      soloTravel: 'Safe with a guide outside Ulaanbaatar',
      naturalRisk: 'Extreme winter cold / dzud',
      naturalHazards: ['Winter temperatures can reach -40°C — layer clothing adequately', 'Flash floods in river valleys during summer rainstorms', 'Wolves and other wildlife in remote areas — stay with guides'],
      scams: ['Taxi overcharging in Ulaanbaatar — agree fare before entering or use apps', 'Fake cashmere products in tourist markets'],
    },
    health: {
      vaccines: { routine: 'Up to date', hepatitisA: 'Recommended', otherVaccine: 'Rabies', otherVaccineNote: 'Recommended if visiting rural areas / working with animals' },
      tapWater: 'Avoid in Ulaanbaatar — drink bottled',
      mosquitoRisk: 'Low',
      waterFood: ['Bottled water recommended even in the capital', 'Airag (fermented mare\'s milk) — try with an open stomach', 'Meat-heavy cuisine; vegetarian options very limited outside UB'],
      healthcare: ['Ulaanbaatar has SOS International Clinic (English-speaking): +976-11-464-325', 'Medical facilities outside Ulaanbaatar are very basic', 'Medical evacuation insurance strongly recommended for remote travel'],
    },
    culture: {
      etiquette: [
        { do: 'Accept food and drink with your right hand or both hands', dont: 'Refuse offered food without tasting' },
        { do: 'Step over the threshold of a ger, not on it', dont: 'Whistle inside a ger' },
        { do: 'Walk around the fire, not between it and family', dont: 'Point feet at the hearth or altar' },
        { do: 'Bring small gifts (candy, flour, tea)', dont: 'Turn your back to the altar at the rear of the ger' },
        { do: 'Use two hands when giving or receiving', dont: 'Touch someone\'s head' },
        { do: 'Compliment the host\'s livestock', dont: 'Ask personal questions immediately on meeting' },
      ],
      tipping: 'Tipping not expected traditionally, but becoming common in Ulaanbaatar restaurants and hotels (10% appreciated). Tour guides genuinely appreciate tips.',
      phrases: [
        { phrase: 'Сайн байна уу (Sain baina uu)', meaning: 'Hello' },
        { phrase: 'Баярлалаа (Bayarlalaa)', meaning: 'Thank you' },
        { phrase: 'Хэд вэ (Khed ve)', meaning: 'How much?' },
        { phrase: 'Орчуулагч (Orchuulagch)', meaning: 'Translator / interpreter' },
        { phrase: 'Эмнэлэг хаана (Emnelgiin haana)', meaning: 'Where is the hospital?' },
      ],
    },
    connectivity: {
      online: [
        { type: 'Local SIM', detail: 'Mobicom / Unitel SIMs at Ulaanbaatar airport. ~$5–10 for 5GB.' },
        { type: 'eSIM', detail: 'Airalo offers Mongolia plans. Limited coverage outside Ulaanbaatar — check map.' },
        { type: 'Public WiFi', detail: 'Available in UB hotels, cafes. Very limited in rural areas.' },
        { type: 'Satellite', detail: 'Starlink available in some ger camps for remote expeditions.' },
      ],
      power: { voltage: '220V', frequency: '50 Hz', plugType: 'Type C / E', note: 'European round-pin plugs. Remote ger camps often use solar/generator — charge devices in the city.' },
    },
    transport: {
      gettingAround: [
        { type: 'Private driver/guide', detail: 'Essential outside Ulaanbaatar. Arrange through guesthouses.' },
        { type: 'Shared minivan (mikr)', detail: 'Cheap intercity transport. Departs when full — bring patience.' },
        { type: 'Domestic flights', detail: 'MIAT and Hunnu Air serve Dalanzadgad (Gobi), Khövsgöl, and other aimag centers.' },
        { type: 'Train', detail: 'Trans-Mongolian runs UB to Beijing and Moscow. Slow but scenic.' },
      ],
      airportArrivals: ['Chinggis Khaan Airport is 50km from Ulaanbaatar center', 'Official taxi stand outside arrivals: ~35,000₮ to city', 'Pre-arrange pickup with your guesthouse to avoid overcharging'],
    },
    food: {
      mustTry: ['Khorkhog (lamb cooked with hot stones)', 'Buuz (steamed meat dumplings)', 'Tsuivan (hand-pulled noodles with meat)', 'Airag (fermented mare\'s milk) — an acquired taste', 'Mongolian BBQ (tuhum)', ],
      avoid: ['Drinking tap water anywhere', 'Raw or undercooked meat from unknown sources'],
      dietary: 'Vegetarian extremely difficult outside Ulaanbaatar. Dairy is central to the diet. Carry protein snacks for rural trips.',
    },
  },

  RO: {
    name: 'Romania',
    overview: {
      whyNow: { title: 'Why visit', body: 'Romania combines medieval Transylvania, the Carpathian mountains, the Danube Delta, and the Black Sea coast. It is one of Europe\'s most affordable destinations. Spring and autumn avoid summer heat and ski season crowds.' },
      bestFor: ['Bran and Peles castles in Transylvania', 'Painted monasteries of Bucovina', 'Danube Delta birdwatching (largest wetland in EU)', 'Skiing in Sinaia and Predeal', 'Bucharest Art Nouveau architecture'],
      headsUp: ['Driving on mountain roads requires care — GPS sometimes inaccurate in Carpathians', 'Bears active in Carpathian forests — follow local guidance on trails', 'Romanian leu (RON) — not all places accept card in rural areas', 'Bucharest traffic is chaotic — allow extra time'],
    },
    safety: {
      advisory: { level: 1, levelText: 'Exercise normal precautions', body: 'Romania is generally safe; petty theft and pickpocketing occur in Bucharest\'s tourist areas.' },
      crimeIndex: '38 · Medium',
      soloTravel: 'Safe',
      naturalRisk: 'Earthquakes (Vrancea zone) / heavy snowfall',
      naturalHazards: ['Vrancea seismic zone produces periodic moderate quakes', 'Heavy snowfall can close mountain passes Oct–Apr', 'Bears frequent Carpathian trails — make noise while hiking'],
      scams: ['Taxi overcharging at Bucharest airports — use Uber/Bolt or pre-book', 'Money exchange scams near tourist areas — use bank ATMs only'],
    },
    health: {
      vaccines: { routine: 'Up to date', hepatitisA: 'Recommended for rural travel', otherVaccine: 'Tick-borne Encephalitis', otherVaccineNote: 'If hiking in Carpathians May–Oct' },
      tapWater: 'Safe in cities; bottled water recommended in rural areas',
      mosquitoRisk: 'Low–Medium (Danube Delta higher)',
      waterFood: ['City tap water is safe; rural well water should be avoided', 'Food standards are EU-regulated — restaurants generally safe', 'Wild mushrooms sold at markets — buy from known vendors only'],
      healthcare: ['EU health care card (EHIC) valid for EU citizens', 'Private hospitals in Bucharest: MedLife, Regina Maria (English-speaking)', 'Emergency: 112 (all emergencies)', 'Pharmacies (farmacie) widely available and well-stocked'],
    },
    culture: {
      etiquette: [
        { do: 'Bring flowers or wine when invited to a home', dont: 'Bring even numbers of flowers (for funerals only)' },
        { do: 'Greet with a firm handshake', dont: 'Kiss strangers on the cheek first meeting' },
        { do: 'Say "Poftă bună" before eating', dont: 'Start eating before the host' },
        { do: 'Dress smartly for restaurants and churches', dont: 'Enter churches with shorts or bare shoulders' },
        { do: 'Accept a glass of ţuică (plum brandy) when offered', dont: 'Refuse three times — you will seem rude' },
        { do: 'Haggle at flea markets', dont: 'Haggle in regular shops' },
      ],
      tipping: 'Tipping 10% in restaurants is standard and appreciated. Round up taxi fares. Leave small change for bar service.',
      phrases: [
        { phrase: 'Bună ziua', meaning: 'Good day / Hello' },
        { phrase: 'Mulțumesc', meaning: 'Thank you' },
        { phrase: 'Cât costă?', meaning: 'How much?' },
        { phrase: 'Unde este toaleta?', meaning: 'Where is the toilet?' },
        { phrase: 'Nu înțeleg', meaning: 'I don\'t understand' },
      ],
    },
    connectivity: {
      online: [
        { type: 'eSIM / Local SIM', detail: 'Digi/Orange/Vodafone Romania. EU roaming free for EU citizens. Non-EU: eSIM ~€5–8 for 10GB.' },
        { type: 'Public WiFi', detail: 'Widely available in cities, cafes, malls. Rural areas have limited coverage.' },
        { type: 'Roaming', detail: 'EU roaming rules apply for EU SIM holders — no extra charge.' },
        { type: '4G coverage', detail: 'Excellent in cities and main roads; limited in remote Carpathian valleys.' },
      ],
      power: { voltage: '230V', frequency: '50 Hz', plugType: 'Type C / F', note: 'Standard European round-pin plugs. UK and US devices need adapters.' },
    },
    transport: {
      gettingAround: [
        { type: 'Inter-city train', detail: 'CFR Călători network. Book online at cfrcalatori.ro. Slow but scenic.' },
        { type: 'Bus / Flixbus', detail: 'Faster than trains on many routes. Flixbus covers major cities.' },
        { type: 'Bolt / Uber', detail: 'Available in Bucharest, Cluj, Timișoara. Much cheaper than regular taxis.' },
        { type: 'Car rental', detail: 'Essential for Transylvania villages and Carpathian roads. Roads are varied quality.' },
      ],
      airportArrivals: ['Bucharest Henri Coandă (OTP): Express bus 783 to city center ~45 min, 3 lei', 'Taxi to city center ~120–150 lei (avoid unlicensed drivers)', 'Bolt/Uber pickup available outside arrivals'],
    },
    food: {
      mustTry: ['Mămăligă (polenta with sour cream and cheese)', 'Sarmale (cabbage rolls with pork and rice)', 'Mici (spiced minced meat rolls grilled)', 'Cozonac (sweet bread with walnuts)', 'Ţuică (plum brandy) — the national spirit'],
      avoid: ['Unlicensed street vendors in Bucharest Old Town at night'],
      dietary: 'Vegetarian improving rapidly in cities. Rural cuisine is very meat-heavy. Post (Orthodox fasting) menus offer vegan options Wed/Fri.',
    },
  },

  DK: {
    name: 'Denmark',
    overview: {
      whyNow: { title: 'Why visit', body: 'Denmark offers world-class food, design, cycling culture, and Copenhagen\'s famous Nyhavn waterfront. Summer (Jun–Aug) brings long days with outdoor festivals. Winter has hygge atmosphere and Christmas markets.' },
      bestFor: ['Nyhavn and Copenhagen\'s food scene', 'Cycling the flat countryside', 'Louisiana Museum of Modern Art north of Copenhagen', 'Legoland in Billund', 'Viking history at Roskilde and Jelling'],
      headsUp: ['Scandinavia is expensive — budget €80–150/day in Copenhagen', 'Bike theft is common — always lock properly', 'Cycling rules are strict — obey signals and stay in bike lanes', 'Most shops closed Sundays outside tourist areas'],
    },
    safety: {
      advisory: { level: 1, levelText: 'Exercise normal precautions', body: 'Denmark is one of the safest countries in the world with very low crime rates.' },
      crimeIndex: '26 · Low',
      soloTravel: 'Very safe',
      naturalRisk: 'Storms / flooding (coastal)',
      naturalHazards: ['Storm surges can affect coastal areas in autumn/winter', 'Ice and frost on cycling paths in winter', 'Strong winds year-round — secure loose items'],
      scams: ['Pickpocketing on Copenhagen S-trains and in busy tourist areas', 'Overpriced "tourist menus" near Tivoli'],
    },
    health: {
      vaccines: { routine: 'Up to date', hepatitisA: 'Not required', otherVaccine: null, otherVaccineNote: null },
      tapWater: 'Safe to drink — excellent quality',
      mosquitoRisk: 'Very low',
      waterFood: ['Tap water is among the best in Europe', 'Food standards are among the highest in the world', 'Smørrebrød (open sandwiches) are safe everywhere'],
      healthcare: ['Excellent universal healthcare — EU EHIC card covers EU citizens', 'Emergency: 112 | Non-emergency doctor: 1813 in Copenhagen', 'English spoken by virtually all medical staff'],
    },
    culture: {
      etiquette: [
        { do: 'Arrive on time — punctuality is important', dont: 'Show off wealth or status' },
        { do: 'Cycle and respect bike lanes', dont: 'Walk in bike lanes — serious accident risk' },
        { do: 'Greet with a handshake or first name immediately', dont: 'Use formal titles unless specifically invited' },
        { do: 'Queue patiently at all times', dont: 'Jump queues under any circumstance' },
        { do: 'Expect candid, direct feedback', dont: 'Take directness as rudeness — it isn\'t' },
        { do: 'Split bills (going Dutch is completely normal)', dont: 'Expect others to pay for you' },
      ],
      tipping: 'Service charge is always included in Danish restaurants by law. Tipping is optional and appreciated for exceptional service — round up or leave 10%.',
      phrases: [
        { phrase: 'Hej', meaning: 'Hello / Hi' },
        { phrase: 'Tak', meaning: 'Thank you' },
        { phrase: 'Hvad koster det?', meaning: 'How much does it cost?' },
        { phrase: 'Undskyld', meaning: 'Excuse me / Sorry' },
        { phrase: 'Hyggeligt!', meaning: 'Cozy / lovely atmosphere!' },
      ],
    },
    connectivity: {
      online: [
        { type: 'EU Roaming', detail: 'EU SIM cards work in Denmark at no extra charge under EU roaming rules.' },
        { type: 'eSIM', detail: 'Airalo / Holafly ~€5–8 for 10GB. Unlimited options available.' },
        { type: 'Public WiFi', detail: 'Excellent and free everywhere — cafes, trains, public buildings.' },
        { type: '5G / 4G', detail: 'Nationwide excellent coverage. 5G in Copenhagen and major cities.' },
      ],
      power: { voltage: '230V', frequency: '50 Hz', plugType: 'Type C / F / K', note: 'Type K (3 round pins) is Danish standard but Type C/F adapters fit most Danish sockets.' },
    },
    transport: {
      gettingAround: [
        { type: 'Cycling', detail: 'The primary way to get around — bike rental from 70 DKK/day.' },
        { type: 'S-train / Metro', detail: 'Copenhagen has S-tog and Metro. Rejsekort card is cheapest.' },
        { type: 'DSB Trains', detail: 'Intercity trains to Aarhus, Odense, Aalborg. Book at dsb.dk.' },
        { type: 'Taxi / Bolt', detail: 'Available but expensive. Bolt is cheapest app option.' },
      ],
      airportArrivals: ['Copenhagen Airport (CPH) to city center: Metro ~15 min, 36 DKK', 'Train to Copenhagen Central: 36 DKK every 10 min', 'Taxi to city: ~250–350 DKK'],
    },
    food: {
      mustTry: ['Smørrebrød (open-faced rye bread sandwiches)', 'Flæskesteg (roast pork with crackling)', 'Danish pastry (wienerbrød) from a real bakery', 'Herring prepared multiple ways', 'Craft beer from Mikkeller or To Øl'],
      avoid: ['Grocery shopping on Sundays — most supermarkets close at 18:00'],
      dietary: 'Denmark is excellent for vegetarian/vegan dining — most restaurants clearly label options. Organic food widely available.',
    },
  },

  TH: {
    name: 'Thailand',
    overview: {
      whyNow: { title: 'Why visit', body: 'Thailand offers tropical beaches, ornate temples, incredible street food, and warm hospitality at low cost. Best visited Nov–Feb when it\'s cool and dry. Avoid Apr–May (extreme heat) and Sep–Oct (monsoon peak).' },
      bestFor: ['Grand Palace and Wat Pho in Bangkok', 'Chiang Mai temples and elephant sanctuaries', 'Island hopping: Koh Lanta, Koh Tao, Koh Samui', 'Street food — voted best in the world', 'Full Moon Party on Koh Phangan'],
      headsUp: ['Songkran (Thai New Year, Apr 13–15) — massive water fight festival, streets close', 'Avoid criticizing or discussing the monarchy — illegal', 'Dress code at temples — shoulders and knees covered', 'Rainy season (Jun–Oct) can bring flooding and road closures'],
    },
    safety: {
      advisory: { level: 1, levelText: 'Exercise normal precautions', body: 'Thailand is generally safe for tourists; exercise increased caution in the Deep South (Pattani, Narathiwat, Yala provinces).' },
      crimeIndex: '41 · Medium',
      soloTravel: 'Generally safe; solo women should exercise normal caution at night',
      naturalRisk: 'Flooding / typhoons (south) / rip currents',
      naturalHazards: ['Rip currents on west coast beaches Jun–Oct — check red/yellow flags', 'Monsoon flooding can close roads in north Sep–Oct', 'Jellyfish season on some coasts — check locally'],
      scams: ['Tuk-tuk "free city tours" that end at overpriced gem shops', 'Closed attraction scam — "temple is closed today, I know a better one"', 'Jet ski damage scam — always photograph before use'],
    },
    health: {
      vaccines: { routine: 'Up to date', hepatitisA: 'Recommended', otherVaccine: 'Typhoid', otherVaccineNote: 'Recommended if eating street food extensively' },
      tapWater: 'Do not drink — bottled water everywhere and cheap',
      mosquitoRisk: 'Medium–High (rainy season)',
      waterFood: ['Never drink tap water or use ice from unknown sources', 'Busy street food stalls with high turnover are generally safe', 'Wash hands before eating — hand sanitizer widely available'],
      healthcare: ['Excellent private hospitals in Bangkok: Bumrungrad (+66-2-066-8888), Bangkok Hospital', 'Medical tourism destination — high quality and affordable', 'Travel insurance essential — covers private hospitals'],
    },
    culture: {
      etiquette: [
        { do: 'Wai (press palms together and bow) when greeted', dont: 'Touch anyone\'s head — the head is sacred' },
        { do: 'Remove shoes before entering homes and temples', dont: 'Point feet at people or sacred objects' },
        { do: 'Dress modestly at temples (cover shoulders and knees)', dont: 'Raise your voice or show anger publicly' },
        { do: 'Smile — it resolves most problems', dont: 'Criticize the royal family under any circumstances (illegal)' },
        { do: 'Bargain politely at markets', dont: 'Bargain aggressively — keep it light and friendly' },
        { do: 'Accept food offered with both hands or right hand', dont: 'Step over food or offerings on the ground' },
      ],
      tipping: 'Tipping is appreciated but not mandatory. Leave 20–50 THB at restaurants, 100 THB for good hotel service. Massage 50–100 THB tip is standard.',
      phrases: [
        { phrase: 'สวัสดี (Sawasdee kha/khrap)', meaning: 'Hello (kha for women, khrap for men)' },
        { phrase: 'ขอบคุณ (Khob khun)', meaning: 'Thank you' },
        { phrase: 'เท่าไหร่ (Thao rai?)', meaning: 'How much?' },
        { phrase: 'ห้องน้ำอยู่ไหน (Hong nam yoo nai?)', meaning: 'Where is the toilet?' },
        { phrase: 'ไม่เผ็ด (Mai phet)', meaning: 'Not spicy please' },
      ],
    },
    connectivity: {
      online: [
        { type: 'Tourist SIM', detail: 'AIS / DTAC / True Move at airport from 299 THB for 30GB/30d. Best value.' },
        { type: 'eSIM', detail: 'Airalo / Klook. AIS eSIM works well across the country.' },
        { type: 'Public WiFi', detail: 'Widely available in cafes, malls, 7-Eleven. Quality varies.' },
        { type: 'Coverage', detail: 'Excellent in Bangkok and resort islands. Remote jungle areas may be patchy.' },
      ],
      power: { voltage: '220V', frequency: '50 Hz', plugType: 'Type A / B / C', note: 'Thailand accepts Type A (US flat pin) so US devices work without adapter. EU devices need Type A adapter.' },
    },
    transport: {
      gettingAround: [
        { type: 'BTS Skytrain / MRT', detail: 'Bangkok elevated and underground rail. Rabbit Card for easy top-up.' },
        { type: 'Grab', detail: 'Dominant rideshare app. Works across Thailand — safer and cheaper than tuk-tuks.' },
        { type: 'Overnight trains', detail: 'State Railway of Thailand (SRT). Scenic overnight Bangkok to Chiang Mai ~12h.' },
        { type: 'Domestic flights', detail: 'Bangkok Airways / AirAsia. Very cheap — often faster than overland for distances.' },
      ],
      airportArrivals: ['Bangkok Suvarnabhumi (BKK): Airport Rail Link to city ~30 min, 45 THB', 'Taxi: ~300–400 THB + 50 THB expressway tolls (metered)', 'Phuket: Grab from airport to Patong ~400–500 THB'],
    },
    food: {
      mustTry: ['Pad Thai from a street wok', 'Tom Yum Goong (spicy shrimp soup)', 'Som Tam (green papaya salad)', 'Khao Man Gai (Hainanese chicken rice)', 'Mango sticky rice dessert'],
      avoid: ['Tap water and ice from unknown sources', 'Pre-sliced fruit left in the sun for hours'],
      dietary: 'Buddhist-influenced — plenty of vegetarian and vegan options. Say "kin jay" (เจ) for vegan. Seafood allergy: show a card as dishes often contain shrimp paste.',
    },
  },

  DE: {
    name: 'Germany',
    overview: {
      whyNow: { title: 'Why visit', body: 'Germany offers medieval towns, world-class museums, the Bavarian Alps, the Rhine Valley, and Berlin\'s vibrant culture. Oktoberfest (Sep–Oct) and Christmas markets (Nov–Dec) are world-famous. Summer is ideal for cycling and outdoor activities.' },
      bestFor: ['Berlin\'s history, art, and nightlife', 'Neuschwanstein Castle in Bavaria', 'Rhine Valley castles and wine villages', 'Oktoberfest in Munich (late Sep–early Oct)', 'Christmas markets in Nuremberg, Cologne, Dresden'],
      headsUp: ['Oktoberfest accommodation books out a year in advance', 'Many small restaurants and shops are cash-only', 'Shops closed on Sundays and public holidays', 'Train strikes (Streik) can occur — check DB website'],
    },
    safety: {
      advisory: { level: 1, levelText: 'Exercise normal precautions', body: 'Germany is very safe with low violent crime. Pickpocketing occurs in major tourist areas.' },
      crimeIndex: '33 · Low–Medium',
      soloTravel: 'Very safe',
      naturalRisk: 'Flooding (Rhine/Moselle rivers in spring)',
      naturalHazards: ['River flooding can affect Rhine and Moselle villages spring and after heavy rain', 'Thunderstorms common in summer — seek shelter during storms', 'Winter ice on pavements and roads in Bavaria'],
      scams: ['Pickpocketing on Berlin U-Bahn and in crowds at major sights', 'Charity petition scam — don\'t sign or pay'],
    },
    health: {
      vaccines: { routine: 'Up to date', hepatitisA: 'Not required', otherVaccine: null, otherVaccineNote: null },
      tapWater: 'Safe to drink — excellent quality',
      mosquitoRisk: 'Very low',
      waterFood: ['Among the safest food standards in the world', 'Tap water excellent throughout the country', 'German bread and sausages (Wurst) are a cultural highlight'],
      healthcare: ['Universal healthcare system — EU EHIC valid for EU citizens', 'Emergency: 112 | Non-emergency doctor: 116 117', 'Pharmacies (Apotheke) on every street — highly trained staff'],
    },
    culture: {
      etiquette: [
        { do: 'Be punctual — Germans take time very seriously', dont: 'Show up late without warning' },
        { do: 'Make eye contact when saying Prost (cheers)', dont: 'Cross arms over others when clinking glasses' },
        { do: 'Recycle correctly — bins are colour-coded', dont: 'Jaywalk — people wait for green even with no traffic' },
        { do: 'Greet shopkeepers with Guten Tag when entering', dont: 'Speak loudly in public spaces' },
        { do: 'Pay cash in traditional restaurants and bakeries', dont: 'Expect friendly small talk from strangers' },
        { do: 'Book tables at popular restaurants', dont: 'Tip 20% — 5–10% or rounding up is normal' },
      ],
      tipping: 'Round up the bill or leave 5–10%. Say "stimmt so" (keep the change) or tell the server the total you want to pay. Tipping on card is unusual — prefer cash.',
      phrases: [
        { phrase: 'Guten Tag', meaning: 'Good day / Hello (formal)' },
        { phrase: 'Danke', meaning: 'Thank you' },
        { phrase: 'Wie viel kostet das?', meaning: 'How much does this cost?' },
        { phrase: 'Entschuldigung', meaning: 'Excuse me / Sorry' },
        { phrase: 'Ich verstehe nicht', meaning: 'I don\'t understand' },
      ],
    },
    connectivity: {
      online: [
        { type: 'EU Roaming', detail: 'EU SIM cards work in Germany at no extra charge.' },
        { type: 'eSIM', detail: 'Airalo or German providers (Telekom, Vodafone, O2). ~€8–12 for 10GB.' },
        { type: 'Public WiFi', detail: 'Available in stations, airports, many cafes. Registration sometimes required.' },
        { type: '4G/5G', detail: 'Good in cities. Rural Bavaria and eastern Germany can have gaps.' },
      ],
      power: { voltage: '230V', frequency: '50 Hz', plugType: 'Type C / F', note: 'Standard European plugs. UK and US devices need adapters.' },
    },
    transport: {
      gettingAround: [
        { type: 'Deutsche Bahn (DB)', detail: 'Nationwide rail network. ICE trains are fast; regional trains slower but scenic. Book at db.de.' },
        { type: 'Deutschlandticket', detail: '€49/month for unlimited regional transport nationwide — exceptional value.' },
        { type: 'U-Bahn / S-Bahn', detail: 'City metro systems in Berlin, Munich, Hamburg, Frankfurt. Tap in/out or validate ticket.' },
        { type: 'Flixbus', detail: 'Cheap intercity coach connections for budget travelers.' },
      ],
      airportArrivals: ['Frankfurt: S-Bahn S8/S9 to city ~12 min, €5', 'Munich: S1/S8 to Marienplatz ~40 min, €13.20', 'Berlin BER: S-Bahn or Regional train to city ~30 min, €3.80'],
    },
    food: {
      mustTry: ['Pretzels (Brezel) fresh from a bakery', 'Weißwurst with sweet mustard and a wheat beer', 'Currywurst — Berlin\'s iconic street food', 'Sauerbraten (pot roast in vinegar marinade)', 'Black Forest cake (Schwarzwälder Kirschtorte)'],
      avoid: ['Asking for a doggy bag — unusual in Germany'],
      dietary: 'German cuisine is meat-heavy but vegetarian options growing fast. Vegan surprisingly easy in Berlin. Halal and kosher options in major cities.',
    },
  },

  GB: {
    name: 'United Kingdom',
    overview: {
      whyNow: { title: 'Why visit', body: 'The UK blends world-class museums (mostly free), historic countryside, and cultural diversity. London, Edinburgh, and the Cotswolds each offer completely different experiences. Summer brings long days; autumn and winter have fewer tourists but often cheaper prices.' },
      bestFor: ['London\'s free museums: British Museum, V&A, Tate Modern', 'Edinburgh\'s Old Town and the Highlands', 'Cotswolds villages and walking routes', 'Stonehenge and Bath Roman baths', 'Pub culture and English ales'],
      headsUp: ['London costs rival Tokyo and Zurich — budget carefully', 'Drive on the left — car rental drivers need to adjust', 'Weather changes rapidly — layer clothing year-round', 'UK uses pounds (GBP) not euros — even in Northern Ireland'],
    },
    safety: {
      advisory: { level: 1, levelText: 'Exercise normal precautions', body: 'The UK is safe overall. Be alert to pickpocketing in London\'s crowded transport and tourist areas.' },
      crimeIndex: '47 · Medium',
      soloTravel: 'Very safe',
      naturalRisk: 'Flooding / coastal erosion',
      naturalHazards: ['Coastal cliff paths can be unstable — stay on marked routes', 'River flooding in low-lying areas autumn/winter', 'Moors and mountains can have rapid weather changes — carry waterproofs'],
      scams: ['Overpriced tourist restaurants near major sights', 'Fake "charity workers" in busy areas'],
    },
    health: {
      vaccines: { routine: 'Up to date', hepatitisA: 'Not required', otherVaccine: null, otherVaccineNote: null },
      tapWater: 'Safe to drink everywhere',
      mosquitoRisk: 'Very low',
      waterFood: ['Tap water excellent throughout the country', 'Food safety standards among the highest in Europe', 'Fish and chips from a reputable chippy is a cultural must'],
      healthcare: ['NHS provides emergency care free to all visitors', 'Emergency: 999 | Non-emergency: 111', 'EU EHIC no longer valid — GHIC (UK Global Health Insurance Card) for UK residents'],
    },
    culture: {
      etiquette: [
        { do: 'Queue patiently — queue-jumping is deeply offensive', dont: 'Jump any queue for any reason' },
        { do: 'Say please, thank you, and sorry constantly', dont: 'Complain loudly or make a scene in public' },
        { do: 'Offer to buy a round at the pub', dont: 'Not buy your round when it\'s your turn' },
        { do: 'Stand on the right of escalators (especially London)', dont: 'Stand on the left — it blocks "walkers"' },
        { do: 'Apologize even when it\'s not your fault', dont: 'Ask personal questions about salary or age' },
        { do: 'Understate everything — it\'s a national art form', dont: 'Mistake understatement for lack of enthusiasm' },
      ],
      tipping: 'In restaurants, 10–12.5% is standard — check if service charge is already included. Tip taxi drivers by rounding up. No tipping in pubs when just ordering drinks at the bar.',
      phrases: [
        { phrase: 'Cheers', meaning: 'Thanks / goodbye / toast' },
        { phrase: 'Sorry', meaning: 'Excuse me / I didn\'t hear you / my fault / not my fault' },
        { phrase: 'Lovely', meaning: 'Good / nice / okay / pleased' },
        { phrase: 'Could I possibly...?', meaning: 'Polite way to ask for anything' },
        { phrase: 'Not bad', meaning: 'Actually quite good' },
      ],
    },
    connectivity: {
      online: [
        { type: 'Tourist SIM', detail: 'Three / EE / Vodafone UK. EE SIM: 30GB for ~£10 at airports.' },
        { type: 'eSIM', detail: 'Airalo or direct from EE/Three. Three offers excellent UK coverage.' },
        { type: 'Public WiFi', detail: 'Everywhere in London. Most cafes, pubs, and public buildings.' },
        { type: '4G/5G', detail: 'Excellent in cities. Scottish Highlands and rural Wales can have gaps.' },
      ],
      power: { voltage: '230V', frequency: '50 Hz', plugType: 'Type G', note: 'UK uses a unique 3-pin rectangular plug. All non-UK devices need a UK adapter — buy before traveling.' },
    },
    transport: {
      gettingAround: [
        { type: 'London Underground', detail: 'The Tube. Use contactless payment or Oyster card. Zone 1–2 is central London.' },
        { type: 'National Rail', detail: 'Intercity trains. Book far ahead for cheapest fares at thetrainline.com.' },
        { type: 'Bus / Coach', detail: 'National Express and Flixbus are cheapest. Megabus for budget travel.' },
        { type: 'Black cabs / Uber', detail: 'Black cabs are iconic and reliable. Uber available in most cities.' },
      ],
      airportArrivals: ['Heathrow: Tube Piccadilly Line to central London ~50 min, £6', 'Gatwick: Gatwick Express to London Bridge ~30 min, £21', 'Edinburgh: Airlink 100 bus to city center 30 min, £5'],
    },
    food: {
      mustTry: ['Full English breakfast', 'Fish and chips from a proper chippy', 'Cornish pasty', 'Sunday roast with Yorkshire pudding', 'Scotch whisky in Edinburgh'],
      avoid: ['Tourist trap "English breakfasts" near major sights — walk one street away'],
      dietary: 'Excellent vegetarian/vegan options countrywide. UK is ahead of most of Europe for plant-based options. Halal food widely available in cities.',
    },
  },

  SG: {
    name: 'Singapore',
    overview: {
      whyNow: { title: 'Why visit', body: 'Singapore is a tropical city-state that packs world-class food, gardens, architecture, and shopping into a tiny area. Hot and humid year-round; rain can come anytime. Best as a hub for Southeast Asia exploration or a short stopover stay.' },
      bestFor: ['Gardens by the Bay light show', 'Hawker centre food (Maxwell, Lau Pa Sat)', 'Sentosa beach and Universal Studios', 'Marina Bay Sands rooftop infinity pool', 'Little India and Chinatown districts'],
      headsUp: ['Extremely strict laws — heavy fines for littering, jaywalking, durian on transit', 'No gum allowed (importing or chewing)', 'Very expensive by Asian standards — budget SGD 150+/day', 'Alcohol expensive — drink at hawker centres not bars to save money'],
    },
    safety: {
      advisory: { level: 1, levelText: 'Exercise normal precautions', body: 'Singapore is one of the safest cities in the world with extremely low crime rates.' },
      crimeIndex: '18 · Very Low',
      soloTravel: 'Extremely safe day and night',
      naturalRisk: 'Flooding (intense rain) / heat',
      naturalHazards: ['Tropical rain can be intense — flash flooding in low areas', 'Heat and humidity can cause heat exhaustion — stay hydrated', 'Haze from Indonesian forest fires can affect air quality Sep–Oct'],
      scams: ['Overpriced fruit cutting services at tourist areas', 'Unlicensed money changers offering suspiciously good rates'],
    },
    health: {
      vaccines: { routine: 'Up to date', hepatitisA: 'Recommended', otherVaccine: null, otherVaccineNote: null },
      tapWater: 'Safe to drink — world-class water treatment',
      mosquitoRisk: 'Low–Medium (dengue risk — use repellent)',
      waterFood: ['Tap water among the best in Asia', 'Licensed hawker centres have strict food safety standards', 'Dengue mosquitoes are day-biters — use repellent outdoors'],
      healthcare: ['Excellent world-class healthcare', 'Singapore General Hospital: +65-6222-3322', 'Travel insurance recommended — private care is expensive', 'Pharmacies at every mall and most MRT stations'],
    },
    culture: {
      etiquette: [
        { do: 'Chope (reserve) hawker table with tissue packet', dont: 'Chew gum — importing it is illegal' },
        { do: 'Use both hands when giving/receiving business cards', dont: 'Litter — fines are SGD 300–1,000' },
        { do: 'Queue everywhere, always', dont: 'Cut queues for taxis, MRT, or anything' },
        { do: 'Remove shoes when entering homes', dont: 'Jaywalk — police do issue fines' },
        { do: 'Try food from all cultural communities (Chinese, Malay, Indian)', dont: 'Eat or drink on the MRT — SGD 500 fine' },
        { do: 'Address elders respectfully', dont: 'Make negative comments about Singapore\'s laws publicly' },
      ],
      tipping: 'Tipping is not expected and not customary. Hotels and restaurants add 10% service charge + 9% GST. Some servers actively decline tips.',
      phrases: [
        { phrase: 'Lah', meaning: 'Sentence-ending particle for emphasis (Singlish)' },
        { phrase: 'Can?', meaning: 'Is that possible? / Is that okay?' },
        { phrase: 'Shiok!', meaning: 'Delicious / excellent / satisfying' },
        { phrase: 'Aiyah', meaning: 'Mild expression of disappointment' },
        { phrase: 'Chope', meaning: 'To reserve a seat (tissue packet method)' },
      ],
    },
    connectivity: {
      online: [
        { type: 'Tourist SIM', detail: 'Singtel / Starhub / M1 at Changi Airport. SGD 15–25 for unlimited 4G/7d.' },
        { type: 'eSIM', detail: 'Airalo Singapore plans from ~SGD 8. Works immediately on arrival.' },
        { type: 'Public WiFi', detail: 'Wireless@SG free nationwide at MRT, libraries, and hawker centres.' },
        { type: '5G', detail: 'Near-complete 5G coverage across Singapore.' },
      ],
      power: { voltage: '230V', frequency: '50 Hz', plugType: 'Type G', note: 'UK-style 3-pin plugs. US and European devices need adapters — available cheaply at Mustafa Centre.' },
    },
    transport: {
      gettingAround: [
        { type: 'MRT', detail: 'World-class metro. EZ-Link card for all public transport. Very cheap and punctual.' },
        { type: 'Bus', detail: 'Comprehensive network. Same EZ-Link card. Google Maps gives real-time info.' },
        { type: 'Grab', detail: 'Southeast Asia\'s dominant rideshare. Faster than taxi apps and fixed pricing.' },
        { type: 'Taxi', detail: 'ComfortDelGro, SMRT. Metered. Surcharges apply during peak hours.' },
      ],
      airportArrivals: ['Changi Airport: MRT train to Tanah Merah, then East West Line to city ~30 min, SGD 2', 'Taxi to Orchard Road ~SGD 25–35', 'Grab often cheaper than taxi — book before clearing customs'],
    },
    food: {
      mustTry: ['Hainanese chicken rice at Tian Tian (Maxwell Hawker Centre)', 'Char kway teow (stir-fried flat noodles)', 'Laksa (spicy coconut noodle soup)', 'Chilli crab — the national dish', 'Kaya toast with soft-boiled eggs at Ya Kun'],
      avoid: ['Eating durian on public transport — heavily fined'],
      dietary: 'Excellent for all diets. Dedicated vegetarian hawker stalls (Indian vegetarian), halal-certified options at most hawker centres, and abundant Chinese Buddhist vegan options.',
    },
  },
}

// Months for overview context
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']

module.exports = { DESTINATION_DATA, MONTH_NAMES }
