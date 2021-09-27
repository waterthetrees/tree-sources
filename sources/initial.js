// For some reason, these were initially includes in src/core/sources.js, but
// they work just like all of the other sources so we've added them here. These
// particular sources are not tied to a country.

const sources = [
  {
    id: "copenhagen",
    country: "Denmark",
    download:
      "http://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:trae_basis&outputFormat=csv&SRSNAME=EPSG:4326",
    info: "https://www.opendata.dk/city-of-copenhagen/trae_basis",
    format: "csv",
    crosswalk: {
      scientific: "traeart",
      common: "dansk_navn",
      // Slaegstnavn "family name" has values like Lind
      planted: "planteaar",
      // Stammeofma "tribal embrace(?)" - crown?,
      health: "sundhed",
      // TODO sooo many other fields
    },
    short: "Copenhagen",
  },
  {
    id: "buenos_aires",
    country: "Argentina",
    short: "Buenos Aires",
    // long: '',
    // shapefile was incomplete?
    download:
      "http://cdn.buenosaires.gob.ar/datosabiertos/datasets/arbolado-en-espacios-verdes/arbolado-en-espacios-verdes.csv",
    info: "https://data.buenosaires.gob.ar/dataset/arbolado-espacios-verdes",
    format: "csv",
    crosswalk: {
      ref: "id_arbol",
      height: "altura_tot",
      dbh: "diametre",
      common: "nombre_com",
      scientific: "nombre_cie",
      family: "nombre_fam",
      // genus: 'nombre_gen', // not good to include without species
    },
  },
  {
    id: "buenos_aires2",
    country: "Argentina",
    short: "Buenos Aires",
    // long: '',
    download:
      "http://cdn.buenosaires.gob.ar/datosabiertos/datasets/arbolado-publico-lineal/arbolado-publico-lineal-2017-2018.geojson",
    // maybe more datasets
    info: "https://data.buenosaires.gob.ar/dataset/arbolado-publico-lineal",
    format: "geojson",
    crosswalk: {
      ref: "nro_registro",
      scientific: "nombre_cientifico",
      // ancho_acera?
      dbh: "diametro_altura_pecho",
      height: "altura_arbol",
    },
    primary: "buenos_aires",
  },
  {
    id: "fingal",
    country: "Ireland",
    short: "Fingal",
    long: "Fingal County",
    download: "http://data.fingal.ie/datasets/csv/Trees.csv",
    info: "https://data.smartdublin.ie/dataset/tableview/ebf9151e-fd30-442e-93cb-fa88c2affc93",
    format: "csv",
    crosswalk: {
      ref: (x) => Math.round(x.TREE_ID),
      scientific: "Species_Desc",
      common: "Common_Name",
      maturity: "Age_Desc",
      height: "Height",
      spread: "Spread",
      dbh: (x) => (x.Actual_Trunk || "").replace("cm", ""),
      health: "Condition",
    },
  },

  {
    id: "palmerston_north",
    country: "New Zealand",
    short: "Palmerston North",
    long: "",
    download:
      "https://opendata.arcgis.com/datasets/077787e2299541bc8d2c2dbf8d7dc4e4_18.zip?outSR=%7B%22latestWkid%22%3A2193%2C%22wkid%22%3A2193%7D",
    info: "http://data-pncc.opendata.arcgis.com/datasets/077787e2299541bc8d2c2dbf8d7dc4e4_18/data",
    format: "zip",
    crosswalk: {
      scientific: "botanical_",
      common: "species",
    },
  },

  {
    id: "basel",
    country: "Switzerland",
    short: "Basel",
    long: "",
    download:
      "https://data.bs.ch/explore/dataset/100052/download/?format=shp&timezone=Australia/Sydney&lang=en",
    info: "https://data.bs.ch/explore/dataset/100052/information/",
    format: "zip",
    crosswalk: {
      scientific: (x) => String(x.art).replace(/ \(.*/, ""),
      common: (x) => (String(x.art).match(/\((.*)\)/) || ["", ""])[1],
      planted: "pflanzdatu",
      age: "baumalter",
      // STANDJAHR? //
    },
  },

  {
    id: "oslo",
    country: "Norway",
    short: "Oslo",
    long: "",
    download:
      "https://opendata.arcgis.com/datasets/f256d2d837554edab8b53bb6af90bc8d_19.zip",
    info: "https://hub.arcgis.com/datasets/f256d2d837554edab8b53bb6af90bc8d_19?geometry=10.516%2C59.709%2C10.873%2C59.884",
    format: "zip",
    crosswalk: {
      updated: "last_edi_1",
      scientific: "BotNavn",
      common: "Artsnavn",
      // lots of others...
    },
  },
  {
    id: "luxembourg",
    country: "Luxembourg",
    short: "Luxembourg",
    long: "Grand-Duchy of Luxembourg",
    download:
      "https://download.data.public.lu/resources/inspire-annex-i-theme-protected-sites-remarkable-trees/20200129-134525/ps.protectedsitesnatureconservation-trees.gml",
    info: "https://catalog.inspire.geoportail.lu/geonetwork/srv/eng/catalog.search#/metadata/bf367452-c965-4ae1-b652-bd2c86400be5",
    format: "gml",
    crosswalk: {
      ref: "localId",
      scientific: (x) => String(x.text).split(" - ")[0],
      common: (x) => String(x.text).split(" - ")[1],
    },
  },
  {
    id: "chile-osm",
    country: "Chile",
    short: "Chile (OSM)",
    long: "",
    download: "https://emscycletours.site44.com/opentrees-data/chile.geojson",
    info: "",
    format: "",
    crosswalk: {
      common: "name",

      // leaf_cycle, leaf_type
    },
    centre: [-70.877, -29.859],
  },
  {
    id: "bologna_it",
    short: "Bologna",
    long: "Comune di Bologna",
    country: "Italy",
    download: "http://dati.comune.bologna.it/download/file/fid/3989",
    info: "http://dati.comune.bologna.it/node/207",
    format: "zip",
    crosswalk: {
      scientific: "decodifi_4",
      circumference: "decodifi_2", // ??
      ref: "NUM_PT",
      // CL_H? height? health?
    },
    license: "CC-BY-3.0 IT", // CC-BY-3.0 IT
    licenseUrl: "http://dati.comune.bologna.it/node/165",
  },
  {
    id: "villa_manin_it",
    short: "Villa_Manin",
    country: "Italy",
    long: "",
    download:
      "https://www.dati.friuliveneziagiulia.it/api/views/uqpq-dr8x/rows.csv?accessType=DOWNLOAD",
    info: "https://www.dati.friuliveneziagiulia.it/dataset/Alberi-di-Villa-Manin/uqpq-dr8x",
    // coordsFunc: x => x['Nuova colonna georeferenziata'].split(/[(), ]/).filter(Number).map(Number),
    crosswalk: {
      location: "dove",
      scientific: "specie",
      family: "familia",
      updated: "data rilievo",
      // lots more fields with very weird names like 'SFRC|SFR', 'PIP|PI'
    },
    license: "",
  },
  {
    id: "monterrey_mx",
    short: "Monterrey",
    long: "Zona Metropolitana de Monterrey",
    download:
      "http://datamx.io/dataset/9ad2f30b-4be9-4abe-beac-aec73ecc9cba/resource/6f1f1fe9-40c7-4527-8e2e-78b0f0c86a40/download/bumfiltercsv.csv",
    info: "http://datamx.io/dataset/arboles-registrados-en-la-zona-metropolitana-de-monterrey",
    crosswalk: {
      ref: "Arbol_id",
      planted: (x) =>
        x.Fecha_plantado !== "0000-00-00" ? x.Fecha_plantado : null,
      common: "Especie", // mostly in Spanish,
      updated: "Fecha_registro",
    },
    license: "",
    centre: [-100.3071, 25.6801],
  },
];
