const country = [
  {
    iso_alpha_2: 'MX',
    iso_alpha_3: 'MEX',
    numeric_country_code: '484',
    country: "Mexico",
  }
]

export default [
  {
    iso_alpha_2: 'MX',
    iso_alpha_3: 'MEX',
    numeric_country_code: '484',
    country: "Mexico",
    city: "Monterrey",
    short: "Monterrey",
    long: "Zona Metropolitana de Monterrey",
    id: "monterrey_mx",
    id_city_name: "monterrey_mx",
    main: "monterrey_mx",
    center: null,
    latitude: null,
    longitude: null,
    info: "http://datamx.io/dataset/arboles-registrados-en-la-zona-metropolitana-de-monterrey",
    broken: false,
    download:
      "http://datamx.io/dataset/9ad2f30b-4be9-4abe-beac-aec73ecc9cba/resource/6f1f1fe9-40c7-4527-8e2e-78b0f0c86a40/download/bumfiltercsv.csv",
    format: null,
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "Arbol_id",
      planted:
        '(x) =>\n        x.Fecha_plantado !== "0000-00-00" ? x.Fecha_plantado : null',
      common: "Especie",
      updated: "Fecha_registro",
    },
  },
];
