export default [
  {
    country: "Luxembourg",
    city: "Luxembourg",
    short: "Luxembourg",
    long: "Grand-Duchy of Luxembourg",
    id: "luxembourg",
    id_city_name: "luxembourg",
    primary: "luxembourg",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://catalog.inspire.geoportail.lu/geonetwork/srv/eng/catalog.search#/metadata/bf367452-c965-4ae1-b652-bd2c86400be5",
    srs: null,
    download:
      "https://download.data.public.lu/resources/inspire-annex-i-theme-protected-sites-remarkable-trees/20200129-134525/ps.protectedsitesnatureconservation-trees.gml",
    format: "gml",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "localId",
      scientific: '(x) => String(x.text).split(" - ")[0]',
      common: '(x) => String(x.text).split(" - ")[1]',
    },
  },
];
