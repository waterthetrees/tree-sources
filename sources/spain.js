const country = [
  {
    isoAlpha2: 'ES',
    isoAlpha3: 'ESP',
    numericCountryCode: '724',
    country: "Spain",
  }
]

export default [
  {
    isoAlpha2: 'ES',
    isoAlpha3: 'ESP',
    numericCountryCode: '724',
    country: "Spain",
    city: "Santiago de Compostela",
    short: "Santiago de Compostela",
    long: "Concello de Santiago de Compostela",
    idName: "santiago",
    main: "santiago",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://datos.santiagodecompostela.gal/catalogo/gl/dataset/arboredo",
    broken: true,
    download:
      "https://datos.santiagodecompostela.gal/catalogo/dataset/60b1928e-32a9-442a-8f69-0215ba0862a4/resource/fab2344b-3c5c-466b-9e63-2e05e11fd9ce/download/arboredo_points.zip",
    format: "zip",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { location: "tipolexia" },
  },
  {
    isoAlpha2: 'ES',
    isoAlpha3: 'ESP',
    numericCountryCode: '724',
    country: "Spain",
    city: "Barcelona",
    short: "Barcelona",
    long: "City of Barcelona",
    idName: "barcelona",
    main: "barcelona",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "https://opendata-ajuntament.barcelona.cat/data/dataset/27b3f8a7-e536-4eea-b025-ce094817b2bd/resource/28034af4-b636-48e7-b3df-fa1c422e6287/download",
    format: "csv",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      common: "NOM_CASTELLA",
      scientific: "NOM_CIENTIFIC",
      planted: "DATA_PLANTACIO",
      idReference: "CODI",
      crown: '(x) => ({ PETITA: "small", MITJANA: "average", GRAN: "large" }[x.ALCADA] || x.ALCADA)',
    },
  },
  {
    isoAlpha2: 'ES',
    isoAlpha3: 'ESP',
    numericCountryCode: '724',
    country: "Spain",
    city: "Valencia",
    short: "Valencia",
    long: "Valencia",
    idName: "valencia_es",
    main: "valencia_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://github.com/stevage/OpenTrees/issues/29",
    broken: true,
    broken_reason: "select * from arbolado where false limit 0",
    download: "http://mapas.valencia.es/lanzadera/opendata/arboles/JSON",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { scientific: "planta", common: "castellano" },
  },
  {
    isoAlpha2: 'ES',
    isoAlpha3: 'ESP',
    numericCountryCode: '724',
    country: "Spain",
    city: "Sevilla",
    short: "Sevilla",
    long: "Sevilla",
    idName: "sevilla_es",
    main: "sevilla_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://sevilla-idesevilla.opendata.arcgis.com/datasets/f3393590cea54e3da883f30a27e8a1fd_0",
    broken: false,
    download:
      "https://sevilla-idesevilla.opendata.arcgis.com/datasets/f3393590cea54e3da883f30a27e8a1fd_0.zip",
    format: null,
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { scientific: "Nombre", height: "Altura", age: "Observ" },
  },
  {
    isoAlpha2: 'ES',
    isoAlpha3: 'ESP',
    numericCountryCode: '724',
    country: "Spain",
    city: "Manlleu",
    short: "Manlleu",
    long: "Manlleu",
    idName: "manlleu_es",
    main: "manlleu_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://dadesobertes-situam.opendata.arcgis.com/datasets/arbrat-del-nucli-urb%C3%A0",
    broken: false,
    download:
      "https://opendata.arcgis.com/datasets/7255e3ea9235496fbd5f6ee244f21015_0.zip?outSR=%7B%22latestWkid%22%3A25831%2C%22wkid%22%3A25831%7D",
    format: null,
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { common: "NCOMU", scientific: "NCIENTIFIC", note: "OBSERVACIO" },
  },
  {
    isoAlpha2: 'ES',
    isoAlpha3: 'ESP',
    numericCountryCode: '724',
    country: "Spain",
    city: "Torrent",
    short: "Torrent",
    long: "Torrent",
    idName: "torrent_es",
    main: "torrent_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://datos.gob.es/es/catalogo/l01462444-arbres-de-torrent-arboles-de-torrent",
    broken: false,
    download:
      "http://datosabiertos.torrent.es/dataset/b372b8dd-07fb-4973-a2af-cb9a7c8de9bb/resource/dbae0e9d-c48b-4185-8a51-2599b093fdba/download/ODMAArbolAislado.csv",
    format: null,
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { scientific: "ESPECIE" },
  },
  {
    isoAlpha2: 'ES',
    isoAlpha3: 'ESP',
    numericCountryCode: '724',
    country: "Spain",
    city: "Arganda del Rey",
    short: "Arganda del Rey",
    long: "Ayuntamiento de Arganda del Rey",
    idName: "arganda_es",
    main: "arganda_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://datos.gob.es/es/catalogo/l01280148-inventario-arboles-casco-urbano-20151",
    broken: false,
    download:
      "https://datosabiertos.ayto-arganda.es/dataset/bc20e1e3-0c6c-4f0e-817b-c95f052e3783/resource/f41cfeb0-6d98-48c1-b8be-fa50c3b958aa/download/arbolado.csv",
    format: null,
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "REFERENCIA",
      scientific: "EMPLAZAMIENTO",
      common: "NOMBRE COMUN",
      height: "ALTURA",
      dbh: "DIAMETRO",
      age: "EDAD",
      health: "ESTADO",
    },
  },
  {
    isoAlpha2: 'ES',
    isoAlpha3: 'ESP',
    numericCountryCode: '724',
    country: "Spain",
    city: "Cáceres",
    short: "Cáceres",
    long: "Ayuntamiento de Cáceres",
    idName: "caceres_es",
    main: "caceres_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://datos.gob.es/es/catalogo/l01100377-arboles-caceres",
    broken: false,
    download:
      "http://opendata.caceres.es/GetData/GetData?dataset=om:Arbol&format=geojson&geojson=Point",
    format: null,
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "uri",
      scientific:
        '(x) =>\n        String(x.dbpedia_owl_species).replace(/.*\\//, "").replace(/_/g, " ")',
      family:
        '(x) =>\n        String(x.dbpedia_owl_family).replace(/.*\\//, "").replace(/_/g, " ")',
      height: "om_altura",
    },
  },
];
