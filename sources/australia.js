const country = [
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
  }
]

export default [
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Corangamite",
    short: "Corangamite",
    long: "Corangamite Shire",
    idName: "corangamite",
    main: "corangamite",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.gov.au/geoserver/corangamite-shire-trees/wfs?request=GetFeature&typeName=ckan_d9677ebb_f3db_45f3_88eb_04089debb9e0&outputFormat=json",
    format: "geojson",
    filename: null,
    gdalOptions: "-s_srs EPSG:4326",
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "id",
      height: "height",
      crown: "width",
      scientific: "species",
      common: "name",
      location:
        '(x) =>\n        ({ "STREET TREE": "street", "PARK TREE": "park" }[x.tree_type] || "")',
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Colac-Otways",
    short: "Colac-Otways",
    long: "Colac-Otways Shire",
    idName: "colac_otways",
    main: "colac_otways",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "http://data.gov.au/geoserver/colac-otway-shire-trees/wfs?request=GetFeature&typeName=ckan_3ce1805b_cb81_4683_8f46_e7bd2d2a3b7c&outputFormat=json",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "tree_id",
      genus: "genus_desc",
      species: "spec_desc",
      scientific: "(x) => `${x.genus_desc} ${x.spec_desc}`.trim()",
      common: "common_nam",
      location: '(x) => x.location_t.split(" ")[1]',
      height: "height_m",
      crown: "canopy_wid",
      dbh: "diam_breas",
      age: "life_stage",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Ballarat",
    short: "Ballarat",
    long: "City of Ballarat",
    idName: "ballarat",
    main: "ballarat",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.gov.au/geoserver/ballarattrees/wfs?request=GetFeature&typeName=ckan_eabaee3f_a563_449b_a04a_1ec847566ea1&outputFormat=json",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "species",
      common: "common",
      species: "species",
      genus: "() => undefined",
      variety: "variety",
      note: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      age: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      idReference: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Manningham",
    short: "Manningham",
    long: "City of Manningham",
    idName: "manningham",
    main: "manningham",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.gov.au/geoserver/manningham-streettrees/wfs?request=GetFeature&typeName=ckan_1aef5123_24ff_4084_a0f1_a52ca71e9e99&outputFormat=json",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      audited: "date1",
      idReference: "tree_no",
      scientific: "species",
      height: "height",
      dbh: "dbh",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Geelong",
    short: "Geelong",
    long: "City of Greater Geelong",
    idName: "geelong",
    main: "geelong",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.gov.au/geoserver/geelong-trees/wfs?request=GetFeature&typeName=ckan_13b1196c_7fb7_436a_86bc_ab24c16526de&outputFormat=json",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: '(x) => `${x.genus} ${(x.species || "").toLowerCase()}`',
      common: "common",
      species: "species",
      genus: "genus",
      variety: "variety",
      note: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      age: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      idReference: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Melbourne",
    short: "Melbourne",
    long: "City of Melbourne",
    idName: "melbourne",
    main: "melbourne",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.melbourne.vic.gov.au/api/views/fp38-wiyy/rows.csv?accessType=DOWNLOAD",
    format: "csv",
    filename: "melbourne.csv",
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "com_id",
      common: "Common Name",
      scientific: "Scientific Name",
      dbh: "Diameter Breast Height",
      planted: "Date Planted",
      age: "Age Description",
      ule_min: "Useful Life Expectency",
      location: "Located In",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Adelaide",
    short: "Adelaide",
    long: "City of Adelaide",
    idName: "adelaide",
    main: "adelaide",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "http://opendata.adelaidecitycouncil.com/street_trees/street_trees.csv",
    format: "csv",
    filename: "adelaide.csv",
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "Asset Id (identifier)",
      dbh: "Circum (Inspection)",
      health: "Vigour (Inspection)",
      height: "Height (Inspection)",
      structure: "Structure (Inspection)",
      age: "Age (Inspection)",
      scientific: "Species Name (Inspection)",
      common: "Common Name (Inspection)",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Waite Arboretum",
    short: "Waite Arboretum",
    long: "Waite Arboretum (Adelaide)",
    idName: "waite",
    main: "waite",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "http://data.sa.gov.au/storage/f/2014-06-23T06%3A12%3A22.180Z/waitetreeid-2014-app-joined-19062014.zip",
    format: "zip",
    filename: "WaiteTreeID_2014_App_Joined_19062014.shp",
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "tree_id",
      scientific: "scientific",
      common: "commonname",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Burnside",
    short: "Burnside",
    long: "City of Burnside",
    idName: "burnside",
    main: "burnside",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.sa.gov.au/data/dataset/b7e1c8f6-169c-41bd-b5d7-140395a41c38/resource/6d1912aa-4775-4f5e-b00d-18456ad872a5/download/burnsidetrees.geojson",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "TreeID",
      common: "CommonName",
      height: "TreeHeight",
      scientific: "BotanicalN",
      dbh: "Circumfere",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Launceston",
    short: "Launceston",
    long: "City of Launceston",
    idName: "launceston",
    main: "launceston",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "http://lcc.launceston.opendata.arcgis.com/datasets/63b09a3688804a17b0edc4b3b072a0d7_1.zip",
    format: "zip",
    filename: "Trees.shp",
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "objectid",
      common: "name",
      scientific: "genusspeci",
      age: "age",
      dbh: "diametr_c",
      height: "height_m",
      crown: "horizontal",
      audited: "auditdate",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Hobson's Bay",
    short: "Hobson's Bay",
    long: "City of Hobson's Bay",
    idName: "hobsons_bay",
    main: "hobsons_bay",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "https://data.gov.au/data/dataset/80051ffe-04d5-4602-b15b-60e0d0e3d153/resource/ea1ec6fc-02bd-4e36-8e43-c990b6a9268d/download/hbcc_street_and_park_trees.json",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      genus: "Genus",
      species: "Species",
      dbh: "DBH",
      location: "Type",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Glenelg",
    short: "Glenelg",
    long: "Glenelg Shire",
    idName: "glenelg",
    main: "glenelg",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "http://data.gov.au/dataset/3721ad67-7b5b-4815-96b1-9d8b1a89dbd7/resource/b9ff3d44-17b4-4f87-8a28-2d540fa37d8f/download/Glenelg-Street-and-Park-Trees.csv",
    format: "csv",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "scientific",
      common: "common",
      species: "species",
      genus: "genus",
      variety: "variety",
      note: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      age: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      idReference: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Southern Grampians",
    short: "Southern Grampians",
    long: "City of Southern Grampians",
    idName: "southern_grampians",
    main: "southern_grampians",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "http://data.gov.au/geoserver/southern-grampians-street-and-park-trees/wfs?request=GetFeature&typeName=ckan_4a2843f5_8c01_438b_95f3_01ef0a518441&outputFormat=json",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "ref",
      scientific: "species",
      common: "common",
      location: "location",
      height: "height",
      crown: "crown",
      age: "maturity",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Prospect",
    short: "Prospect",
    long: "City of Prospect",
    idName: "prospect1",
    main: "prospect1",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.sa.gov.au/data/dataset/5d86d41e-b6c6-47d5-9b88-4d95916c5e76/resource/d1e30913-6e91-4a1f-b576-64120cc4b242/download/city-of-prospect-tree-species-in-reserves-2016.csv",
    format: "csv",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      species: "Tree Species",
      age: "Tree Age",
      dbh: '(x) => `${x["Tree Circumference"]} circumference`',
      health: "Tree Health",
      structure: "Tree Structure",
      height: "Tree Height",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Prospect",
    short: "Prospect",
    long: "City of Prospect",
    idName: "prospect2",
    main: "prospect1",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.sa.gov.au/data/dataset/7bf2e4a4-40cc-40fd-83a9-fabb6d854039/resource/3f6be219-d66f-4b40-bfc7-16214fbc0989/download/city-of-prospect-street-trees-2016.csv",
    format: "csv",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { common: "Species Name" },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Perth",
    short: "Perth",
    long: "City of Perth",
    idName: "perth",
    main: "perth",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://opendata.arcgis.com/datasets/c5ce51d9789a4e9a8510acb8c8f3ecf4_0.zip",
    format: "zip",
    filename: "PKS_AST_TREESMASTER_PV.shp",
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "BOTANICAL_",
      common: "COMMON_NAM",
      family: "FAMILY",
      height: "TREE_HEIGH",
      planted: "DATE_PLANT",
      idReference: "TREE_ID",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Brimbank",
    short: "Brimbank",
    long: "City of Brimbank",
    idName: "brimbank",
    main: "brimbank",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.gov.au/geoserver/brimbank-open-space-trees/wfs?request=GetFeature&typeName=ckan_7a57b5a1_2ca3_4171_be91_0d371cefd250&outputFormat=json",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "central_as",
      location: "location",
      genus: "genus",
      species: "species",
      common: "common_nam",
      age: "age",
      height: "height",
      crown: "spread",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Bendigo",
    short: "Bendigo",
    long: "City of Greater Bendigo",
    idName: "bendigo",
    main: "bendigo",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.gov.au/geoserver/city-of-greater-bendigo-environment-trees/wfs?request=GetFeature&typeName=ckan_d17c9e50_fab1_40e6_b91d_6e665faf2656&outputFormat=json",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "assetid",
      note: "desc",
      scientific: (x) => x.species.split(" - ")[0],
      common: (x) => x.species.split(" - ")[1],
      variety: (x) => (x.cultivar !== "Not Specified" ? x.cultivar : ""),
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Shepparton",
    short: "Shepparton",
    long: "City of Shepparton",
    idName: "shepparton",
    main: "shepparton",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "https://data.gov.au/dataset/e794491f-2eb7-4035-8b0c-f7248c28feda/resource/a1148573-68b9-4bd8-bda4-f08030d38c9d/download/greatersheppartoncitycouncilstreetandparktrees.zip",
    format: "zip",
    filename: "Greater_Shepparton_City_Council_Street_and_Park_Trees.shp",
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "scientific",
      common: "common",
      species: "species",
      genus: "genus",
      variety: "variety",
      note: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      age: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      idReference: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Wyndham",
    short: "Wyndham",
    long: "City of Wyndham",
    idName: "wyndham",
    main: "wyndham",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "https://data.gov.au/dataset/0254dee0-5b26-484f-a5ae-5ca3cab46601/resource/fb06e7c8-d037-489b-a963-b747271f2e54/download/trees.json",
    format: "zip",
    filename: "OpenData_TI_Trees_LatestInspection.shp",
    gdalOptions: "-s_srs unzip/OpenData_TI_Trees_LatestInspection.prj",
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      idReference: "tree_id",
      common: "tree_commo",
      height: "height",
      crown: "canopy_wid",
      dbh: "diameter_breast_height",
      age: "tree_age",
      health: "health",
      ule: "useful_life_expectancy",
      structure: "structure",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Port Phillip",
    short: "Port Phillip",
    long: "City of Port Phillip",
    idName: "port-phillip",
    main: "port-phillip",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "https://data.gov.au/dataset/6b72d22b-d824-4281-bd08-ab62e3c38415/resource/9b0d7d55-5267-464b-85d7-3d141d779bab/download/city-of-port-phillip-trees.geojson",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "species",
      common: "common",
      species: "species",
      genus: "genus",
      variety: "variety",
      note: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      age: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      idReference: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Boroondara",
    short: "Boroondara",
    long: "City of Boroondara",
    idName: "boroondara",
    main: "boroondara",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.gov.au/geoserver/significant-tree/wfs?request=GetFeature&typeName=ckan_14e2b87e_c733_4071_b604_c0cb33d14a42&outputFormat=json",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      species: "botanicaln",
      common: "commonname",
      height: "height",
      crown: "canopyspre",
      health: "health",
      note: "significan",
      location: "locality",
      dbh: (x) => `${x.girth} girth`,
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Yarra",
    short: "Yarra",
    long: "City of Yarra",
    idName: "yarra",
    main: "yarra",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.gov.au/data/dataset/f3c88ce7-504b-4ef7-907f-686037f7420c/resource/6e4186b0-3e00-48f9-a09c-cb60d1d0d49f/download/yarra-street-and-park-trees.geojson",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "scientific",
      common: "common",
      species: (s) => (s.species || "").replace(/^[A-Z]\\. /, ""),
      genus: "genus",
      variety: "variety",
      note: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      age: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      idReference: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Glen Eira",
    short: "Glen Eira",
    long: "City of Glen Eira",
    idName: "glen_eira",
    main: "glen_eira",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.gov.au/geoserver/street-and-park-trees/wfs?request=GetFeature&typeName=ckan_0553b144_9145_4458_922f_5c6175d2e100&outputFormat=json",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      dbh: "dbh",
      common: "common_nam",
      scientific: "botanical",
      height: "height",
      crown: "spread",
      location: "locationty",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Wodonga",
    short: "Wodonga",
    long: "City of Wodonga",
    idName: "wodonga",
    main: "wodonga",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://data.gov.au/data/dataset/e7d6ebd3-04a8-4d73-b8ba-a9b82aa79b16/resource/180ba7ad-7bd7-490b-81f8-79c74ec0a915/download/tree.csv",
    format: "csv",
    filename: "wodonga.csv",
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { idReference: "field_1", scientific: "field_2", common: "field_3" },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Hobart",
    short: "Hobart",
    long: "City of Hobart",
    idName: "hobart",
    main: "hobart",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "http://data-1-hobartcc.opendata.arcgis.com/datasets/d50fa3c9875d43fbb7e462248160e1ee_0.geojson",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Sherwood Arboretum",
    short: "Sherwood Arboretum",
    long: "Sherwood Arboretum (Brisbane)",
    idName: "sherwood_arboretum",
    main: "sherwood_arboretum",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: true,
    download:
      "http://www.spatial-data.brisbane.qld.gov.au/datasets/613169f42b43494499c83640392c43e5_0.geojson",
    format: "geojson",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      common: "Common_Name",
      scientific: "Scientific_Name",
      family: "Family",
      height: "Height",
      crown: "Crown_width",
      dbh: (x) => x.DBH / 10 || undefined,
      id: "ObjectId",
    },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Sydney",
    short: "Sydney",
    long: "City of Sydney",
    idName: "sydney",
    main: "sydney",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    broken: false,
    download:
      "https://emscycletours.site44.com/opentrees-data/sydney-tree-data.csv",
    format: "csv",
    filename: "sydney.csv",
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { scientific: "species", scientific: "species", common: "species" },
  },
  {
    isoAlpha2: 'AU',
    isoAlpha3: 'AUS',
    numericCountryCode: '036',
    country: "Australia",
    city: "Unley",
    short: "Unley",
    long: "Unley",
    idName: "unley",
    main: "unley",
    center: null,
    latitude: null,
    longitude: null,
    info: "http://hub.arcgis.com/datasets/unley::trees/data",
    broken: false,
    download:
      "https://opendata.arcgis.com/datasets/910774507d6a42248a50f9922054a0a0_0.zip",
    format: "zip",
    filename: null,
    gdalOptions: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      genus: "dom_genus_",
      species: "dom_spcie",
      common: "dom_common",
      scientific: x => `${x.dom_genus_} ${x.dom_spcie}`,
      health: "health",
      structure: "structure",
      age: "age",
      ule: "unel___repl",
    },
  },
];