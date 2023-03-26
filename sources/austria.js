const country = [
  {
    isoAlpha2: 'AT',
    isoAlpha3: 'AUT',
    numericCountryCode: '040',
    country: 'Austria',
  },
];

export default [
  {
    isoAlpha2: 'AT',
    isoAlpha3: 'AUT',
    numericCountryCode: '040',
    country: 'Austria',
    city: 'Vienna',
    short: 'Vienna',
    long: 'Vienna',
    idSourceName: 'vienna',
    main: 'vienna',
    center: null,
    latitude: null,
    longitude: null,
    info: 'https://www.data.gv.at/katalog/dataset/c91a4635-8b7d-43fe-9b27-d95dec8392a7',
    broken: false,
    download:
      'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BAUMKATOGD&srsName=EPSG:4326&outputFormat=csv',
    format: 'csv',
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: 'BAUM_ID',
      dbh: (x) => (x.STAMMUNGFANG / 3.14159) * 2,
      height: 'BAUMHOEHE',
      scientific: 'GATTUNG_ART',
      crown: 'KRONENDURCHMESSER',
    },
  },
  {
    isoAlpha2: 'AT',
    isoAlpha3: 'AUT',
    numericCountryCode: '040',
    country: 'Austria',
    city: 'Linz',
    short: 'Linz',
    long: 'City of Linz',
    idSourceName: 'linz',
    main: 'linz',
    center: null,
    latitude: null,
    longitude: null,
    info: 'https://www.data.gv.at/katalog/dataset/baumkataster',
    broken: true,
    download:
      'http://data.linz.gv.at/katalog/umwelt/baumkataster/2020/FME_BaumdatenBearbeitet_OGD_20200225.csv',
    format: 'csv',
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: 'BaumNr',
      genus: 'Gattung',
      species: (x) => (x.Art !== '0' ? x.Art : undefined),
      common: 'NameDeutsch',
      height: 'Hoehe',
      crown: 'Schirmdurchmesser',
      dbh: 'Stammumfang',
    },
  },
];
