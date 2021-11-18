export default [
  {
    country: "UK",
    city: "Belfast",
    short: "Belfast",
    long: "Belfast",
    id: "belfast",
    id_city_name: "belfast",
    primary: "belfast",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://www.belfastcity.gov.uk/council/Openandlinkeddata/opendatasets.aspx",
    srs: null,
    brokenDownload: true,
    download:
      "https://www.belfastcity.gov.uk/nmsruntime/saveasdialog.aspx?lID=14543&sID=2430",
    format: "csv",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      location: "TYPEOFTREE",
      common: "SPECIESTYPE",
      scientific: "SPECIES",
      maturity: "AGE",
      health: "CONDITION",
      dbh: "DIAMETERinCENTIMETRES",
      spread: "SPREADRADIUSinMETRES",
      height: "TREEHEIGHTinMETRES",
    },
  },
  {
    country: "UK",
    city: "London",
    short: "London",
    long: "Greater London Authority",
    id: "london",
    id_city_name: "london",
    primary: "london",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "https://data.london.gov.uk/download/local-authority-maintained-trees/c52e733d-bf7e-44b8-9c97-827cb2bc53be/london_street_trees_gla_20180214.csv",
    format: "csv",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "gla_id",
      scientific: "species_name",
      common: "common_name",
      description: "display_name",
    },
  },
  {
    country: "UK",
    city: "Bristol",
    short: "Bristol",
    long: "Bristol",
    id: "bristol",
    id_city_name: "bristol",
    primary: "bristol",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://opendata.bristol.gov.uk/explore/dataset/trees/export/",
    srs: null,
    download:
      "https://opendata.bristol.gov.uk/explore/dataset/trees/download/?format=geojson&timezone=Australia/Sydney&lang=en",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      dbh: "dbh",
      height: "crown_height",
      common: "full_common_name",
      scientific: "latin_name",
      crown: "(x) => x.crown_width",
    },
  },
  {
    country: "UK",
    city: "Edinburgh",
    short: "Edinburgh",
    long: "Edinburgh",
    id: "edinburgh",
    id_city_name: "edinburgh",
    primary: "edinburgh",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.edinburghcouncilmaps.info/datasets/4dfc8f18a40346009b9fc32cbee34039_39",
    srs: null,
    download:
      "https://data.edinburghcouncilmaps.info/datasets/4dfc8f18a40346009b9fc32cbee34039_39.zip",
    format: "zip",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "LatinName",
      common: "CommonName",
      height: "Height",
      spread: "Spread",
      maturity: "AgeGroup",
      bh: "DiameterAt",
    },
  },
  {
    country: "UK",
    city: "Dundee",
    short: "Dundee",
    long: "Dundee City Council",
    id: "dundee",
    id_city_name: "dundee",
    primary: "dundee",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.dundeecity.gov.uk/dataset/trees",
    srs: null,
    download:
      "https://data.dundeecity.gov.uk/datastore/dump/e54ef90a-76e5-415e-a272-5e489d9f5c67",
    format: "csv",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "TREE_NUMBER",
      height: "HEIGHT_M",
      circumference: "GIRTH",
      maturity: "AGE_CLASS",
      scientific: "SCIENTIFIC_NAME",
      common: "POPULAR_NAME",
    },
  },
  {
    country: "UK",
    city: "York",
    short: "York",
    long: "City of York Council",
    id: "york",
    id_city_name: "york",
    primary: "york",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.gov.uk/dataset/12dcc527-a7e2-4b23-a3c5-1501053ff0f5/council-owned-trees",
    srs: null,
    download:
      "https://opendata.arcgis.com/datasets/30f38f358843467daa2d93074a03b8d5_3.csv",
    format: "csv",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { ref: "TREEID", scientific: "BOTANICAL", common: "SPECIES" },
  },
  {
    country: "UK",
    city: "York",
    short: "York",
    long: "York",
    id: "york-private",
    id_city_name: "york-private",
    primary: "york",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.gov.uk/dataset/c166b067-5a9d-487b-a37d-4d350f8cff51/private-trees",
    srs: null,
    download:
      "https://opendata.arcgis.com/datasets/a602aca10afb49659720b435d3f54023_18.csv",
    format: "csv",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { owner: "OWNER", common: "SPECIES", scientific: "BOTANICAL" },
  },
  {
    country: "UK",
    city: "Craig-y-Nos",
    short: "Craig-y-Nos",
    long: "Craig-y-Nos Country Park",
    id: "craigynos_uk",
    id_city_name: "craigynos_uk",
    primary: "craigynos_uk",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.gov.uk/dataset/35853f97-5cb9-4779-89aa-87fd4d657595/craig-y-nos-tree-survey",
    srs: null,
    download:
      "https://gis.beacons-npa.gov.uk/geoserver/inspire/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=inspire:cyn_tree_survey",
    format: "gml",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { updated: "survey_date" },
  },
];
