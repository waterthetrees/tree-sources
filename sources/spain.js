<<<<<<< HEAD
module.exports = [
    {
        id: 'santiago',
        country: 'Spain',
        short: 'Santiago de Compostela',
        long: 'Concello de Santiago de Compostela',
        download:
            'https://datos.santiagodecompostela.gal/catalogo/dataset/60b1928e-32a9-442a-8f69-0215ba0862a4/resource/fab2344b-3c5c-466b-9e63-2e05e11fd9ce/download/arboredo_points.zip',
        info:
            'https://datos.santiagodecompostela.gal/catalogo/gl/dataset/arboredo',
        format: 'zip',
        crosswalk: {
            location: 'tipolexia',
        },
    },
    {
        id: 'barcelona',
        download:
            'https://opendata-ajuntament.barcelona.cat/data/dataset/27b3f8a7-e536-4eea-b025-ce094817b2bd/resource/28034af4-b636-48e7-b3df-fa1c422e6287/download',
        format: 'csv',
        short: 'Barcelona',
        long: 'City of Barcelona',
        latitudeField: 'LATITUD_WGS84',
        longitudeField: 'LONGITUD_WGS84',
        country: 'Spain',
        crosswalk: {
            common: 'NOM_CASTELLA', // there's also NOM_CATALA.
            scientific: 'NOM_CIENTIFIC',
            planted: 'DATA_PLANTACIO',
            ref: 'CODI',
            crown: x =>
                ({ PETITA: 'small', MITJANA: 'average', GRAN: 'large' }[
                    x.ALCADA
                ] || x.ALCADA),
            // dbh: 'MIDA_ESCOCELL', // this is the size of the tree pit
            // ALCADA (reach): PETITA (small), MITJANA (average), GRAN (big)
        },
    },
    {
        id: 'valencia_es',
        short: 'Valencia',
        long: '',
        download: 'http://mapas.valencia.es/lanzadera/opendata/arboles/JSON',
        info: 'https://github.com/stevage/OpenTrees/issues/29',
        format: 'geojson',
        crosswalk: {
            scientific: 'planta',
            common: 'castellano',
            //grupo?
        },
        license: 'CC-BY-4.0',
        centre: [-0.38564, 39.46454],
    },
    {
        id: 'sevilla_es',
        short: 'Sevilla',
        long: '',
        download:
            'https://sevilla-idesevilla.opendata.arcgis.com/datasets/f3393590cea54e3da883f30a27e8a1fd_0.zip',
        info:
            'https://sevilla-idesevilla.opendata.arcgis.com/datasets/f3393590cea54e3da883f30a27e8a1fd_0',
        crosswalk: {
            scientific: 'Nombre',
            height: 'Altura',
            // Perimetro?
            maturity: 'Observ',
            // aux_arbol?
        },
        license: '',
    },
    {
        id: 'manlleu_es',
        short: 'Manlleu',
        long: '',
        download:
            'https://opendata.arcgis.com/datasets/7255e3ea9235496fbd5f6ee244f21015_0.zip?outSR=%7B%22latestWkid%22%3A25831%2C%22wkid%22%3A25831%7D',
        info:
            'https://dadesobertes-situam.opendata.arcgis.com/datasets/arbrat-del-nucli-urb%C3%A0',
        crosswalk: {
            common: 'NCOMU',
            scientiic: 'NCIENTIFIC',
            note: 'OBSERVACIO',
        },
        license: '',
    },

    /*
    // ugh, very messed up. Even most of the coordinates are bad, like "[-3,44509490754315]"
    {
        id: 'madrid_es',
        short: 'Madrid',
        long: '',
        download:
            'https://datosabiertos.ayto-arganda.es/dataset/bc20e1e3-0c6c-4f0e-817b-c95f052e3783/resource/411fb473-7620-4060-be7a-5f2bebc090b4/download/argandainventario2015.zip',
        info:
            'https://datos.gob.es/es/catalogo/l01280148-inventario-arboles-casco-urbano-20151',
        zip: true,
        format: 'kml', // ew
        crosswalk: {
            description: 'Description', // seriously? HTML table. this cannot end well.
        },
        license: '',
    },*/
    {
        id: 'torrent_es',
        short: 'Torrent',
        long: '',
        download:
            'http://datosabiertos.torrent.es/dataset/b372b8dd-07fb-4973-a2af-cb9a7c8de9bb/resource/dbae0e9d-c48b-4185-8a51-2599b093fdba/download/ODMAArbolAislado.csv',
        info:
            'https://datos.gob.es/es/catalogo/l01462444-arbres-de-torrent-arboles-de-torrent',
        crosswalk: {
            scientific: 'ESPECIE',
        },
        license: '',
    },
    {
        id: 'arganda_es',
        short: 'Arganda del Rey',
        long: 'Ayuntamiento de Arganda del Rey',
        download:
            'https://datosabiertos.ayto-arganda.es/dataset/bc20e1e3-0c6c-4f0e-817b-c95f052e3783/resource/f41cfeb0-6d98-48c1-b8be-fa50c3b958aa/download/arbolado.csv',
        info:
            'https://datos.gob.es/es/catalogo/l01280148-inventario-arboles-casco-urbano-20151',
        srs: 'EPSG:32630',
        delFunc: x => x.ESTADO === 'ALCORQUE VACIO', // empty land
        crosswalk: {
            ref: 'REFERENCIA',
            scientific: 'EMPLAZAMIENTO',
            common: 'NOMBRE COMUN',
            height: 'ALTURA',
            diameter: 'DIAMETRO', // 15? 30?
            age: 'EDAD',
            health: 'ESTADO',
            // others...
        },
        license: '',
    },
    {
        id: 'caceres_es',
        short: 'Cáceres',
        long: 'Ayuntamiento de Cáceres',
        download:
            'http://opendata.caceres.es/GetData/GetData?dataset=om:Arbol&format=geojson&geojson=Point',
        info: 'https://datos.gob.es/es/catalogo/l01100377-arboles-caceres',
        crosswalk: {
            ref: 'uri', // whoa. someone is really into linked open data
            scientific: x =>
                String(x.dbpedia_owl_species)
                    .replace(/.*\//, '')
                    .replace(/_/g, ' '),
            family: x =>
                String(x.dbpedia_owl_family)
                    .replace(/.*\//, '')
                    .replace(/_/g, ' '),
            height: 'om_altura',
        },
        license: '',
    },
].map(x => ({ ...x, country: 'Spain' }));
=======
export default [
  {
    country: "Spain",
    city: "Santiago de Compostela",
    short: "Santiago de Compostela",
    long: "Concello de Santiago de Compostela",
    id: "santiago",
    id_city_name: "santiago",
    primary: "santiago",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://datos.santiagodecompostela.gal/catalogo/gl/dataset/arboredo",
    srs: null,
    brokenDownload: true,
    download:
      "https://datos.santiagodecompostela.gal/catalogo/dataset/60b1928e-32a9-442a-8f69-0215ba0862a4/resource/fab2344b-3c5c-466b-9e63-2e05e11fd9ce/download/arboredo_points.zip",
    format: "zip",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { location: "tipolexia" },
  },
  {
    country: "Spain",
    city: "Barcelona",
    short: "Barcelona",
    long: "City of Barcelona",
    id: "barcelona",
    id_city_name: "barcelona",
    primary: "barcelona",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "https://opendata-ajuntament.barcelona.cat/data/dataset/27b3f8a7-e536-4eea-b025-ce094817b2bd/resource/28034af4-b636-48e7-b3df-fa1c422e6287/download",
    format: "csv",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      common: "NOM_CASTELLA",
      scientific: "NOM_CIENTIFIC",
      planted: "DATA_PLANTACIO",
      ref: "CODI",
      crown:
        '(x) =>\n        ({ PETITA: "small", MITJANA: "average", GRAN: "large" }[x.ALCADA] ||\n        x.ALCADA)',
    },
  },
  {
    country: "Spain",
    city: "Valencia",
    short: "Valencia",
    long: "Valencia",
    id: "valencia_es",
    id_city_name: "valencia_es",
    primary: "valencia_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://github.com/stevage/OpenTrees/issues/29",
    srs: null,
    brokenDownload: false,
    download: "http://mapas.valencia.es/lanzadera/opendata/arboles/JSON",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { scientific: "planta", common: "castellano" },
  },
  {
    country: "Spain",
    city: "Sevilla",
    short: "Sevilla",
    long: "Sevilla",
    id: "sevilla_es",
    id_city_name: "sevilla_es",
    primary: "sevilla_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://sevilla-idesevilla.opendata.arcgis.com/datasets/f3393590cea54e3da883f30a27e8a1fd_0",
    srs: null,
    brokenDownload: false,
    download:
      "https://sevilla-idesevilla.opendata.arcgis.com/datasets/f3393590cea54e3da883f30a27e8a1fd_0.zip",
    format: null,
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { scientific: "Nombre", height: "Altura", maturity: "Observ" },
  },
  {
    country: "Spain",
    city: "Manlleu",
    short: "Manlleu",
    long: "Manlleu",
    id: "manlleu_es",
    id_city_name: "manlleu_es",
    primary: "manlleu_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://dadesobertes-situam.opendata.arcgis.com/datasets/arbrat-del-nucli-urb%C3%A0",
    srs: null,
    brokenDownload: false,
    download:
      "https://opendata.arcgis.com/datasets/7255e3ea9235496fbd5f6ee244f21015_0.zip?outSR=%7B%22latestWkid%22%3A25831%2C%22wkid%22%3A25831%7D",
    format: null,
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { common: "NCOMU", scientiic: "NCIENTIFIC", note: "OBSERVACIO" },
  },
  {
    country: "Spain",
    city: "Torrent",
    short: "Torrent",
    long: "Torrent",
    id: "torrent_es",
    id_city_name: "torrent_es",
    primary: "torrent_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://datos.gob.es/es/catalogo/l01462444-arbres-de-torrent-arboles-de-torrent",
    srs: null,
    brokenDownload: false,
    download:
      "http://datosabiertos.torrent.es/dataset/b372b8dd-07fb-4973-a2af-cb9a7c8de9bb/resource/dbae0e9d-c48b-4185-8a51-2599b093fdba/download/ODMAArbolAislado.csv",
    format: null,
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { scientific: "ESPECIE" },
  },
  {
    country: "Spain",
    city: "Arganda del Rey",
    short: "Arganda del Rey",
    long: "Ayuntamiento de Arganda del Rey",
    id: "arganda_es",
    id_city_name: "arganda_es",
    primary: "arganda_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://datos.gob.es/es/catalogo/l01280148-inventario-arboles-casco-urbano-20151",
    srs: null,
    brokenDownload: false,
    download:
      "https://datosabiertos.ayto-arganda.es/dataset/bc20e1e3-0c6c-4f0e-817b-c95f052e3783/resource/f41cfeb0-6d98-48c1-b8be-fa50c3b958aa/download/arbolado.csv",
    format: null,
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "REFERENCIA",
      scientific: "EMPLAZAMIENTO",
      common: "NOMBRE COMUN",
      height: "ALTURA",
      diameter: "DIAMETRO",
      age: "EDAD",
      health: "ESTADO",
    },
  },
  {
    country: "Spain",
    city: "Cáceres",
    short: "Cáceres",
    long: "Ayuntamiento de Cáceres",
    id: "caceres_es",
    id_city_name: "caceres_es",
    primary: "caceres_es",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://datos.gob.es/es/catalogo/l01100377-arboles-caceres",
    srs: null,
    brokenDownload: false,
    download:
      "http://opendata.caceres.es/GetData/GetData?dataset=om:Arbol&format=geojson&geojson=Point",
    format: null,
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "uri",
      scientific:
        '(x) =>\n        String(x.dbpedia_owl_species).replace(/.*\\//, "").replace(/_/g, " ")',
      family:
        '(x) =>\n        String(x.dbpedia_owl_family).replace(/.*\\//, "").replace(/_/g, " ")',
      height: "om_altura",
    },
  },
];
>>>>>>> f6f6864a5e38638b7899216b85e7d14a9ed24c56
