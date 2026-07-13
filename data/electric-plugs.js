// ── IEC World Plugs data — manual placeholder ────────────────────────────────
// https://www.iec.ch/world-plugs is behind an AWS WAF bot challenge
// (x-amzn-waf-action: challenge) and can't be fetched server-side, so this
// file is filled in by hand from the browser response instead of a live
// call. The /briefing route in server/index.js prefers this data over the
// curated connectivity.power fallback in destinations.js whenever a country
// has an entry here.
//
// Paste entries below exactly as the IEC API returns them — one object per
// country, straight out of https://www.iec.ch/api/maps?country=..., e.g.:
//   { id: "BM", label: "Bermuda", plugs: [1, 2], frequencies: [60], voltages: [120] }
//
// plugs[] are IEC plug-type codes 1–15, mapping to letter types A–O (see
// PLUG_TYPE_LETTERS below). frequencies[] are in Hz, voltages[] in V. `id`
// is the ISO2 country code — this file indexes by it automatically below.

const IEC_PLUGS_RAW = [
  {"id":"AF","label":"Afghanistan","plugs":[3,6],"frequencies":[50],"voltages":[220]},
  {"id":"AL","label":"Albania","plugs":[3,6],"frequencies":[50],"voltages":[230]},
  {"id":"DZ","label":"Algeria","plugs":[3,6],"frequencies":[50],"voltages":[230]},
  {"id":"AS","label":"American Samoa","plugs":[1,2,6,9],"frequencies":[60],"voltages":[120]},
  {"id":"AD","label":"Andorra","plugs":[3,6],"frequencies":[50],"voltages":[230]},
  {"id":"AO","label":"Angola","plugs":[3],"frequencies":[50],"voltages":[220]},
  {"id":"AI","label":"Anguilla","plugs":[1],"frequencies":[60],"voltages":[110]},
  {"id":"AG","label":"Antigua and Barbuda","plugs":[1,2],"frequencies":[60],"voltages":[230]},
  {"id":"AR","label":"Argentina","plugs":[9],"frequencies":[50],"voltages":[220]},
  {
    "id": "AM",
    "label": "Armenia",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "AW",
    "label": "Aruba",
    "plugs": [
      1,
      2,
      6
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      127
    ]
  },
  {
    "id": "AU",
    "label": "Australia",
    "plugs": [
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "AT",
    "label": "Austria",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "AZ",
    "label": "Azerbaijan",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "BS",
    "label": "Bahamas",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "BH",
    "label": "Bahrain",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "BD",
    "label": "Bangladesh",
    "plugs": [
      3,
      4,
      7,
      11
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "BB",
    "label": "Barbados",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      115
    ]
  },
  {
    "id": "BY",
    "label": "Belarus",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "BE",
    "label": "Belgium",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "BZ",
    "label": "Belize",
    "plugs": [
      1,
      2,
      7
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      110,
      220
    ]
  },
  {
    "id": "BJ",
    "label": "Benin",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "BM",
    "label": "Bermuda",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "BT",
    "label": "Bhutan",
    "plugs": [
      3,
      4,
      6,
      7,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "BO",
    "label": "Bolivia",
    "plugs": [
      1,
      3
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      115,
      230
    ]
  },
  {
    "id": "BA",
    "label": "Bosnia and Herzegovina",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "BW",
    "label": "Botswana",
    "plugs": [
      4,
      7,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "BR",
    "label": "Brazil",
    "plugs": [
      3,
      14
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      127,
      220
    ]
  },
  {
    "id": "IO",
    "label": "British Virgin Islands",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      110
    ]
  },
  {
    "id": "BN",
    "label": "Brunei Darussalam",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "BG",
    "label": "Bulgaria",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "BF",
    "label": "Burkina Faso",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "MM",
    "label": "Burma",
    "plugs": [
      3,
      4,
      6,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "BI",
    "label": "Burundi",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "KH",
    "label": "Cambodia",
    "plugs": [
      1,
      3,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "CM",
    "label": "Cameroon",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "CA",
    "label": "Canada",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "CV",
    "label": "Cape Verde",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "KY",
    "label": "Cayman Islands",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "CF",
    "label": "Central African Republic",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "TD",
    "label": "Chad",
    "plugs": [
      3,
      4,
      5,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "CL",
    "label": "Chile",
    "plugs": [
      3,
      12
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "CN",
    "label": "China",
    "plugs": [
      1,
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "CO",
    "label": "Colombia",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      110
    ]
  },
  {
    "id": "KM",
    "label": "Comoros",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "CG",
    "label": "Congo, Republic of the",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "CK",
    "label": "Cook Islands",
    "plugs": [
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "CR",
    "label": "Costa Rica",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "CI",
    "label": "Cote d Ivoire",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "HR",
    "label": "Croatia",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "JP",
    "label": "Japan",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      50,
      60
    ],
    "voltages": [
      100
    ]
  },
  {
    "id": "JO",
    "label": "Jordan",
    "plugs": [
      2,
      3,
      4,
      6,
      7,
      10
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "KZ",
    "label": "Kazakhstan",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "KE",
    "label": "Kenya",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "KI",
    "label": "Kiribati",
    "plugs": [
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "KP",
    "label": "Korea, Democratic Peoples Republic of",
    "plugs": [
      1,
      3,
      6
    ],
    "frequencies": [
      50,
      60
    ],
    "voltages": [
      220,
      110
    ]
  },
  {
    "id": "KR",
    "label": "Korea, Republic of",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "KW",
    "label": "Kuwait",
    "plugs": [
      3,
      7,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "KG",
    "label": "Kyrgyzstan",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "LA",
    "label": "Lao Peoples Democratic Republic",
    "plugs": [
      1,
      2,
      3,
      5,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "LV",
    "label": "Latvia",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "LB",
    "label": "Lebanon",
    "plugs": [
      1,
      2,
      3,
      4,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "LS",
    "label": "Lesotho",
    "plugs": [
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "LR",
    "label": "Liberia",
    "plugs": [
      1,
      2,
      3,
      5,
      6
    ],
    "frequencies": [
      50,
      60
    ],
    "voltages": [
      120,
      220
    ]
  },
  {
    "id": "LY",
    "label": "Libyan Arab Jamahiriya",
    "plugs": [
      3,
      4,
      6,
      12
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      127,
      230
    ]
  },
  {
    "id": "LI",
    "label": "Liechtenstein",
    "plugs": [
      3,
      10
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "LT",
    "label": "Lithuania",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "LU",
    "label": "Luxembourg",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "MO",
    "label": "Macau",
    "plugs": [
      4,
      6,
      7,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "MK",
    "label": "Macedonia",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "MG",
    "label": "Madagascar",
    "plugs": [
      3,
      4,
      5,
      10,
      11
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      127,
      220
    ]
  },
  {
    "id": "MW",
    "label": "Malawi",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "MY",
    "label": "Malaysia",
    "plugs": [
      1,
      3,
      7,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "MQ",
    "label": "Martinique",
    "plugs": [
      3,
      4,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "MR",
    "label": "Mauritania",
    "plugs": [
      3
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "MU",
    "label": "Mauritius",
    "plugs": [
      3,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "MX",
    "label": "Mexico",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      127
    ]
  },
  {
    "id": "FM",
    "label": "Micronesia, Federated States of",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "MC",
    "label": "Monaco",
    "plugs": [
      3,
      4,
      5,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "MN",
    "label": "Mongolia",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "ME",
    "label": "Montenegro",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "MS",
    "label": "Montserrat",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "MA",
    "label": "Morocco",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      127,
      220
    ]
  },
  {
    "id": "MZ",
    "label": "Mozambique",
    "plugs": [
      3,
      6,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "NA",
    "label": "Namibia",
    "plugs": [
      4,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "NR",
    "label": "Nauru",
    "plugs": [
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "NP",
    "label": "Nepal",
    "plugs": [
      3,
      4,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "NL",
    "label": "Netherlands",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "AN",
    "label": "Netherlands Antilles",
    "plugs": [
      1,
      2,
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      127,
      220
    ]
  },
  {
    "id": "NC",
    "label": "New Caledonia",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "NZ",
    "label": "New Zealand",
    "plugs": [
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "NI",
    "label": "Nicaragua",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "NE",
    "label": "Republic of Niger",
    "plugs": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "NG",
    "label": "Nigeria",
    "plugs": [
      4,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "NO",
    "label": "Norway",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "OM",
    "label": "Oman",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "PK",
    "label": "Pakistan",
    "plugs": [
      3,
      4,
      7,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "PW",
    "label": "Palau",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "PA",
    "label": "Panama",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      110
    ]
  },
  {
    "id": "PG",
    "label": "Papua New Guinea",
    "plugs": [
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "PY",
    "label": "Paraguay",
    "plugs": [
      3
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "PE",
    "label": "Peru",
    "plugs": [
      1,
      2,
      3
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "PH",
    "label": "Philippines",
    "plugs": [
      1,
      2,
      3
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "PL",
    "label": "Poland",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "PT",
    "label": "Portugal",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "PR",
    "label": "Puerto Rico",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "QA",
    "label": "Qatar",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "MD",
    "label": "Republic of Moldova",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "RE",
    "label": "Reunion",
    "plugs": [
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "RO",
    "label": "Romania",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "RU",
    "label": "Russia",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "RW",
    "label": "Rwanda",
    "plugs": [
      3,
      5,
      6,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "KN",
    "label": "Saint Kitts and Nevis",
    "plugs": [
      1,
      2,
      4,
      7
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "LC",
    "label": "Saint Lucia",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "MF",
    "label": "Saint Martin",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120,
      220
    ]
  },
  {
    "id": "VC",
    "label": "Saint Vincent and the Grenadines",
    "plugs": [
      1,
      3,
      5,
      7,
      9,
      11
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "WS",
    "label": "Samoa",
    "plugs": [
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "SM",
    "label": "San Marino",
    "plugs": [
      3,
      6,
      12
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "ST",
    "label": "Sao Tome and Principe",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "SA",
    "label": "Saudi Arabia",
    "plugs": [
      7
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      220,
      230
    ]
  },
  {
    "id": "SN",
    "label": "Senegal",
    "plugs": [
      3,
      4,
      5,
      11
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "RS",
    "label": "Serbia",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "SC",
    "label": "Seychelles",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "SL",
    "label": "Sierra Leone",
    "plugs": [
      4,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "SG",
    "label": "Singapore",
    "plugs": [
      3,
      7,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "SK",
    "label": "Slovakia",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "SI",
    "label": "Slovenia",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "SB",
    "label": "Solomon Islands",
    "plugs": [
      7,
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "SO",
    "label": "Somalia",
    "plugs": [
      3
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "ZA",
    "label": "South Africa",
    "plugs": [
      3,
      13,
      14
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "ES",
    "label": "Spain",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "LK",
    "label": "Sri Lanka",
    "plugs": [
      4,
      7,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "SD",
    "label": "Sudan",
    "plugs": [
      3,
      4
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "SR",
    "label": "Suriname",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      127
    ]
  },
  {
    "id": "SZ",
    "label": "Swaziland",
    "plugs": [
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "SE",
    "label": "Sweden",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "CH",
    "label": "Switzerland",
    "plugs": [
      3,
      10
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "SY",
    "label": "Syrian Arab Republic",
    "plugs": [
      3,
      5,
      12
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "TW",
    "label": "Taiwan, Province of China",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      110
    ]
  },
  {
    "id": "TJ",
    "label": "Tajikistan",
    "plugs": [
      3,
      6,
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "TH",
    "label": "Thailand",
    "plugs": [
      1,
      2,
      3,
      6,
      15
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "TL",
    "label": "Timor-Leste",
    "plugs": [
      3,
      5,
      6,
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "TG",
    "label": "Togo",
    "plugs": [
      3
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "TO",
    "label": "Tonga",
    "plugs": [
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "TT",
    "label": "Trinidad and Tobago",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      115
    ]
  },
  {
    "id": "TN",
    "label": "Tunisia",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "TR",
    "label": "Turkey",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "TM",
    "label": "Turkmenistan",
    "plugs": [
      2,
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "TC",
    "label": "Turks and Caicos Islands",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "TV",
    "label": "Tuvalu",
    "plugs": [
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "UG",
    "label": "Uganda",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "UA",
    "label": "Ukraine",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "GB",
    "label": "United Kingdom",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "TZ",
    "label": "United Republic of Tanzania",
    "plugs": [
      4,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "US",
    "label": "United States",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "VI",
    "label": "United States Virgin Islands",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      110
    ]
  },
  {
    "id": "UY",
    "label": "Uruguay",
    "plugs": [
      3,
      6,
      12
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "UZ",
    "label": "Uzbekistan",
    "plugs": [
      3,
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "VU",
    "label": "Vanuatu",
    "plugs": [
      3,
      7,
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "VE",
    "label": "Venezuela",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "VN",
    "label": "Vietnam",
    "plugs": [
      1,
      2,
      3
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "YE",
    "label": "Yemen",
    "plugs": [
      4,
      7,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "ZM",
    "label": "Zambia",
    "plugs": [
      3,
      4,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "ZW",
    "label": "Zimbabwe",
    "plugs": [
      4,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "AE",
    "label": "United Arab Emirates",
    "plugs": [
      7,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "CU",
    "label": "Cuba",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      110
    ]
  },
  {
    "id": "CY",
    "label": "Cyprus",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "CZ",
    "label": "Czech Republic",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "CD",
    "label": "Democratic Republic of the Congo",
    "plugs": [
      3,
      4,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "DK",
    "label": "Denmark",
    "plugs": [
      3,
      5,
      6,
      11
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "DJ",
    "label": "Djibouti",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "DM",
    "label": "Dominica",
    "plugs": [
      4,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "DO",
    "label": "Dominican Republic",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      110
    ]
  },
  {
    "id": "EC",
    "label": "Ecuador",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "EG",
    "label": "Egypt",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "SV",
    "label": "El Salvador",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      115
    ]
  },
  {
    "id": "GQ",
    "label": "Equatorial Guinea",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "ER",
    "label": "Eritrea",
    "plugs": [
      3,
      12
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "EE",
    "label": "Estonia",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "ET",
    "label": "Ethiopia",
    "plugs": [
      3,
      6,
      12
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "FK",
    "label": "Falkland Islands (Malvinas)",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "FO",
    "label": "Faroe Islands",
    "plugs": [
      3,
      5,
      6,
      11
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "FJ",
    "label": "Fiji",
    "plugs": [
      9
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "FI",
    "label": "Finland",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "FR",
    "label": "France",
    "plugs": [
      3,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "GF",
    "label": "French Guiana",
    "plugs": [
      3,
      4,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "GA",
    "label": "Gabon",
    "plugs": [
      3
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "GM",
    "label": "Gambia",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "GE",
    "label": "Georgia",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "DE",
    "label": "Germany",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "GH",
    "label": "Ghana",
    "plugs": [
      4,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "GI",
    "label": "Gibraltar",
    "plugs": [
      3,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "GR",
    "label": "Greece",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "GL",
    "label": "Greenland",
    "plugs": [
      3,
      5,
      6,
      11
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "GD",
    "label": "Grenada",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "GP",
    "label": "Guadeloupe",
    "plugs": [
      3,
      4,
      5
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "GU",
    "label": "Guam",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      110
    ]
  },
  {
    "id": "GT",
    "label": "Guatemala",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      120
    ]
  },
  {
    "id": "GN",
    "label": "Guinea",
    "plugs": [
      3,
      6,
      11
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "GW",
    "label": "Guinea-Bissau",
    "plugs": [
      3
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "GY",
    "label": "Guyana",
    "plugs": [
      1,
      2,
      4,
      7
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "HT",
    "label": "Haiti",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      110
    ]
  },
  {
    "id": "HN",
    "label": "Honduras",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      60
    ],
    "voltages": [
      110
    ]
  },
  {
    "id": "HK",
    "label": "Hong Kong",
    "plugs": [
      4,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "HU",
    "label": "Hungary",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "IS",
    "label": "Iceland",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "IN",
    "label": "India",
    "plugs": [
      3,
      4,
      13
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "ID",
    "label": "Indonesia",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220,
      110
    ]
  },
  {
    "id": "IR",
    "label": "Iran (Islamic Republic of)",
    "plugs": [
      3,
      6
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      220
    ]
  },
  {
    "id": "IQ",
    "label": "Iraq",
    "plugs": [
      3,
      4,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "IE",
    "label": "Ireland",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "IM",
    "label": "Isle of Man",
    "plugs": [
      3,
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      240
    ]
  },
  {
    "id": "IL",
    "label": "Israel",
    "plugs": [
      8
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "IT",
    "label": "Italy",
    "plugs": [
      3,
      6,
      12
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  },
  {
    "id": "JM",
    "label": "Jamaica",
    "plugs": [
      1,
      2
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      110
    ]
  },
  {
    "id": "MT",
    "label": "Malta",
    "plugs": [
      7
    ],
    "frequencies": [
      50
    ],
    "voltages": [
      230
    ]
  }
]

const PLUG_TYPE_LETTERS = {
  1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F', 7: 'G', 8: 'H',
  9: 'I', 10: 'J', 11: 'K', 12: 'L', 13: 'M', 14: 'N', 15: 'O',
}

const ELECTRIC_PLUGS = {}
for (const entry of IEC_PLUGS_RAW) {
  if (entry && entry.id) ELECTRIC_PLUGS[entry.id.toUpperCase()] = entry
}

module.exports = { ELECTRIC_PLUGS, PLUG_TYPE_LETTERS, IEC_PLUGS_RAW }
