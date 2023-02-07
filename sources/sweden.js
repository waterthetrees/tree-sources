const country = [
  {
    isoAlpha2: 'SE',
    isoAlpha3: 'SWE',
    numericCountryCode: '752',
    country: "Sweden",
  }
]

export default [
  {
    isoAlpha2: 'SE',
    isoAlpha3: 'SWE',
    numericCountryCode: '752',
    country: "Sweden",
    city: "Umea",
    short: "Umea",
    long: "Umea",
    idName: "umea",
    main: "umea",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://opendata.umea.se/explore/dataset/trad-som-forvaltas-av-gator-och-parker/export/?disjunctive.tradart_vetenskap_namn_1_1_2&disjunctive.tradart_svenskt_namn_1_1_3",
    broken: false,
    download:
      "https://opendata.umea.se/explore/dataset/trad-som-forvaltas-av-gator-och-parker/download/?format=shp&timezone=Europe/Stockholm&lang=en",
    format: "zip",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "tradart_vet",
      common: "tradart_sve",
      location: "gatu_eller",
      planted:  "planterings",
    },
  },
  {
    isoAlpha2: 'SE',
    isoAlpha3: 'SWE',
    numericCountryCode: '752',
    country: "Sweden",
    city: "Trädportalen",
    short: "Trädportalen",
    long: "Trädportalen",
    idName: "tradportalen",
    main: "tradportalen",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://www.tradportalen.se/Summary.aspx",
    broken: false,
    download:
      "https://tradportalen.s3.eu-north-1.amazonaws.com/tradportalen.zip",
    format: "zip",
    filename: "data/combined.json",
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: '(x) => String(x.Species).split(", ")[1]',
      common: '(x) => String(x.Species).split(", ")[0]',
      height: "Height",
      dbh: "(x) => (Number(x.TrunkCircumference) / 3.14159) * 2",
    },
  },
];
