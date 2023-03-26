const country = [
  {
    isoAlpha2: 'CH',
    isoAlpha3: 'CHE',
    numericCountryCode: '756',
    country: 'Switzerland',
  },
];

export default [
  {
    isoAlpha2: 'CH',
    isoAlpha3: 'CHE',
    numericCountryCode: '756',
    country: 'Switzerland',
    city: 'Basel',
    short: 'Basel',
    long: 'Basel',
    idSourceName: 'basel',
    main: 'basel',
    center: null,
    latitude: null,
    longitude: null,
    info: 'https://data.bs.ch/explore/dataset/100052/information/',
    broken: false,
    download:
      'https://data.bs.ch/explore/dataset/100052/download/?format=shp&timezone=Australia/Sydney&lang=en',
    format: 'zip',
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: '(x) => String(x.art).replace(/ \\(.*/, "")',
      common: '(x) => (String(x.art).match(/\\((.*)\\)/) || ["", ""])[1]',
      planted: 'pflanzdatu',
      age: 'baumalter',
    },
  },
];
