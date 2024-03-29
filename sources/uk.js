const country = [
  {
    isoAlpha2: 'GB',
    isoAlpha3: 'GBR',
    numericCountryCode: '826',
    country: "United Kingdom",
  }
]

export default [
  {
    isoAlpha2: 'GB',
    isoAlpha3: 'GBR',
    numericCountryCode: '826',
    country: "United Kingdom",
    city: "Belfast",
    short: "Belfast",
    long: "Belfast",
    idSourceName: "belfast",
    main: "belfast",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://www.belfastcity.gov.uk/council/Openandlinkeddata/opendatasets.aspx",
    broken: true,
    download:
      "https://www.belfastcity.gov.uk/nmsruntime/saveasdialog.aspx?lID=14543&sID=2430",
    format: "csv",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      location: "TYPEOFTREE",
      common: "SPECIESTYPE",
      scientific: "SPECIES",
      age: "AGE",
      health: "CONDITION",
      dbh: "DIAMETERinCENTIMETRES",
      spread: "SPREADRADIUSinMETRES",
      height: "TREEHEIGHTinMETRES",
    },
  },
  {
    isoAlpha2: 'GB',
    isoAlpha3: 'GBR',
    numericCountryCode: '826',
    country: "United Kingdom",
    city: "London",
    short: "London",
    long: "Greater London Authority",
    idSourceName: "london",
    main: "london",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "https://data.london.gov.uk/download/local-authority-maintained-trees/c52e733d-bf7e-44b8-9c97-827cb2bc53be/london_street_trees_gla_20180214.csv",
    format: "csv",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "gla_id",
      scientific: "species_name",
      common: "common_name",
      note: "display_name",
    },
  },
  {
    isoAlpha2: 'GB',
    isoAlpha3: 'GBR',
    numericCountryCode: '826',
    country: "United Kingdom",
    city: "Bristol",
    short: "Bristol",
    long: "Bristol",
    idSourceName: "bristol",
    main: "bristol",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://opendata.bristol.gov.uk/explore/dataset/trees/export/",
    broken: false,
    download:
      "https://opendata.bristol.gov.uk/explore/dataset/trees/download/?format=geojson&timezone=Australia/Sydney&lang=en",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: "team@treesforstreets.org",
    contact: "Trees for Streets",
    crosswalk: {
      dbh: "dbh",
      height: "crown_height",
      common: "full_common_name",
      scientific: "latin_name",
      crown: "(x) => x.crown_width",
    },
  },
  {
    isoAlpha2: 'GB',
    isoAlpha3: 'GBR',
    numericCountryCode: '826',
    country: "United Kingdom",
    city: "Edinburgh",
    short: "Edinburgh",
    long: "Edinburgh",
    idSourceName: "edinburgh",
    main: "edinburgh",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.edinburghcouncilmaps.info/datasets/cityofedinburgh::trees/about",
    broken: false,
    download:
      "https://opendata.arcgis.com/api/v3/datasets/46fe85843cb8494abbf37c87ea94936b_39/downloads/data?format=geojson&spatialRefId=4326&where=1%3D1",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "LatinName",
      common: "CommonName",
      height: "Height",
      spread: "Spread",
      age: "AgeGroup",
      dbh: "DiameterAtBreastHeight",
    },
  },
  {
    isoAlpha2: 'GB',
    isoAlpha3: 'GBR',
    numericCountryCode: '826',
    country: "United Kingdom",
    city: "Dundee",
    short: "Dundee",
    long: "Dundee City Council",
    idSourceName: "dundee_uk",
    main: "dundee_uk",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.dundeecity.gov.uk/dataset/trees",
    broken: false,
    download:
      "https://data.dundeecity.gov.uk/datastore/dump/e54ef90a-76e5-415e-a272-5e489d9f5c67",
    format: "csv",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "TREE_NUMBER",
      height: "HEIGHT_M",
      dbh: "GIRTH",
      age: "AGE_CLASS",
      scientific: "SCIENTIFIC_NAME",
      common: "POPULAR_NAME",
    },
  },
  {
    isoAlpha2: 'GB',
    isoAlpha3: 'GBR',
    numericCountryCode: '826',
    country: "United Kingdom",
    city: "York",
    short: "York",
    long: "City of York Council",
    idSourceName: "york_uk",
    main: "york_uk",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.gov.uk/dataset/12dcc527-a7e2-4b23-a3c5-1501053ff0f5/council-owned-trees",
    broken: false,
    download:
      "https://opendata.arcgis.com/datasets/30f38f358843467daa2d93074a03b8d5_3.csv",
    format: "csv",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { idReference: "TREEID", scientific: "BOTANICAL", common: "SPECIES" },
  },
  {
    isoAlpha2: 'GB',
    isoAlpha3: 'GBR',
    numericCountryCode: '826',
    country: "United Kingdom",
    city: "York",
    short: "York",
    long: "York",
    idSourceName: "york-private_uk",
    main: "york_uk",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.gov.uk/dataset/c166b067-5a9d-487b-a37d-4d350f8cff51/private-trees",
    broken: false,
    download:
      "https://opendata.arcgis.com/datasets/a602aca10afb49659720b435d3f54023_18.csv",
    format: "csv",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { owner: "OWNER", common: "SPECIES", scientific: "BOTANICAL" },
  },
  {
    isoAlpha2: 'GB',
    isoAlpha3: 'GBR',
    numericCountryCode: '826',
    country: "United Kingdom",
    city: "Craig-y-Nos",
    short: "Craig-y-Nos",
    long: "Craig-y-Nos Country Park",
    idSourceName: "craigynos_uk",
    main: "craigynos_uk",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.gov.uk/dataset/35853f97-5cb9-4779-89aa-87fd4d657595/craig-y-nos-tree-survey",
    broken: false,
    download:
      "https://gis.beacons-npa.gov.uk/geoserver/inspire/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=inspire:cyn_tree_survey",
    format: "gml",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { updated: "survey_date" },
  },
];
