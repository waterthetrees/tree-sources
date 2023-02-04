const country = [
  {
    iso_alpha_2: 'DK',
    iso_alpha_3: 'DNK',
    numeric_country_code: '208',
    country: "Denmark",
  }
]

export default [
  {
    iso_alpha_2: 'DK',
    iso_alpha_3: 'DNK',
    numeric_country_code: '208',
    country: "Denmark",
    city: "Copenhagen",
    short: "Copenhagen",
    long: "Copenhagen",
    id: "copenhagen",
    id_city_name: "copenhagen",
    main: "copenhagen",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://www.opendata.dk/city-of-copenhagen/trae_basis",
    broken: false,
    download:
      "https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:trae_basis&outputFormat=csv&SRSNAME=EPSG:4326",
    format: "csv",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "traeart",
      common: "dansk_navn",
      planted: "planteaar",
      health: "sundhed",
    },
  },
];
