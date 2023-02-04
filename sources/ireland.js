const country = [
  {
    iso_alpha_2: 'IE',
    iso_alpha_3: 'IRL',
    numeric_country_code: '372',
    country: "Ireland",
  }
]

export default [
  {
    iso_alpha_2: 'IE',
    iso_alpha_3: 'IRL',
    numeric_country_code: '372',
    country: "Ireland",
    city: "Fingal",
    short: "Fingal",
    long: "Fingal County",
    id: "fingal",
    id_city_name: "fingal",
    main: "fingal",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.fingal.ie/datasets/FingalCoCo::trees-fcc-1/explore",
    broken: false,
    download: "https://opendata.arcgis.com/api/v3/datasets/1e5f9db62e53443d946c15a1a06fd98b_0/downloads/data?format=geojson&spatialRefId=4326&where=1%3D1",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "(x) => Math.round(x.TREE_ID)",
      scientific: "Species_Desc",
      common: "Common_Name",
      age: "Age_Desc",
      height: "Height",
      spread: "Spread",
      dbh: '(x) => (x.Actual_Trunk || "").replace("cm", "")',
      health: "Condition",
    },
  },
];
