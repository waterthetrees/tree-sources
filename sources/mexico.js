const country = [
  {
    isoAlpha2: 'MX',
    isoAlpha3: 'MEX',
    numericCountryCode: '484',
    country: 'Mexico',
  },
];

export default [
  {
    isoAlpha2: 'MX',
    isoAlpha3: 'MEX',
    numericCountryCode: '484',
    country: 'Mexico',
    city: 'Monterrey',
    short: 'Monterrey',
    long: 'Zona Metropolitana de Monterrey',
    idSourceName: 'monterrey_mx',
    main: 'monterrey_mx',
    center: null,
    latitude: null,
    longitude: null,
    info: 'http://datamx.io/dataset/arboles-registrados-en-la-zona-metropolitana-de-monterrey',
    broken: false,
    download:
      'http://datamx.io/dataset/9ad2f30b-4be9-4abe-beac-aec73ecc9cba/resource/6f1f1fe9-40c7-4527-8e2e-78b0f0c86a40/download/bumfiltercsv.csv',
    format: null,
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: 'Arbol_id',
      planted:
        '(x) =>\n        x.Fecha_plantado !== "0000-00-00" ? x.Fecha_plantado : null',
      common: 'Especie',
      updated: 'Fecha_registro',
    },
  },
];
