const country = [
  {
    isoAlpha2: 'IT',
    isoAlpha3: 'ITA',
    numericCountryCode: '380',
    country: "Italy",
  }
]

export default [
  {
    isoAlpha2: 'IT',
    isoAlpha3: 'ITA',
    numericCountryCode: '380',
    country: "Italy",
    city: "Bologna",
    short: "Bologna",
    long: "Comune di Bologna",
    id: "bologna_it",
    idName: "bologna_it",
    main: "bologna_it",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://opendata.comune.bologna.it/explore/dataset/alberi-manutenzioni/information/?disjunctive.classe&disjunctive.cl_h&disjunctive.dimora&disjunctive.d_edif",
    broken: true,
    broken_reason: "Data has Specie arborea field but no common field",
    download: "https://opendata.comune.bologna.it/explore/dataset/alberi-manutenzioni/download/?format=geojson&timezone=Europe/Rome&lang=it",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "Specie arborea",
      height: "Classe di altezza",
      updated: "Data ultimo aggiornamento",
      planted: "Data Impianto",
    },
  },
  {
    isoAlpha2: 'IT',
    isoAlpha3: 'ITA',
    numericCountryCode: '380',
    country: "Italy",
    city: "Villa_Manin",
    short: "Villa_Manin",
    long: "Villa_Manin",
    idName: "villa_manin_it",
    main: "villa_manin_it",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://www.dati.friuliveneziagiulia.it/dataset/Alberi-di-Villa-Manin/uqpq-dr8x",
    broken: false,
    download:
      "https://www.dati.friuliveneziagiulia.it/api/views/uqpq-dr8x/rows.csv?accessType=DOWNLOAD",
    format: null,
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      location: "dove",
      scientific: "specie",
      family: "familia",
      updated: "data rilievo",
    },
  },
];
