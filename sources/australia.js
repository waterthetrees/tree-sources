export default [
  {
    country: "Australia",
    city: "Corangamite",
    short: "Corangamite",
    long: "Corangamite Shire",
    id: "corangamite",
    id_city_name: "corangamite",
    primary: "corangamite",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.gov.au/geoserver/corangamite-shire-trees/wfs?request=GetFeature&typeName=ckan_d9677ebb_f3db_45f3_88eb_04089debb9e0&outputFormat=json",
    format: "geojson",
    filename: null,
    gdal_options: "-s_srs EPSG:4326",
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "id",
      height: "height",
      crown: "width",
      scientific: "species",
      common: "name",
      location:
        '(x) =>\n        ({ "STREET TREE": "street", "PARK TREE": "park" }[x.tree_type] || "")',
    },
  },
  {
    country: "Australia",
    city: "Colac-Otways",
    short: "Colac-Otways",
    long: "Colac-Otways Shire",
    id: "colac_otways",
    id_city_name: "colac_otways",
    primary: "colac_otways",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "http://data.gov.au/geoserver/colac-otway-shire-trees/wfs?request=GetFeature&typeName=ckan_3ce1805b_cb81_4683_8f46_e7bd2d2a3b7c&outputFormat=json",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "tree_id",
      genus: "genus_desc",
      species: "spec_desc",
      scientific: "(x) => `${x.genus_desc} ${x.spec_desc}`.trim()",
      common: "common_nam",
      location: '(x) => x.location_t.split(" ")[1]',
      height: "height_m",
      crown: "canopy_wid",
      dbh: "diam_breas",
      maturity: "life_stage",
    },
  },
  {
    country: "Australia",
    city: "Ballarat",
    short: "Ballarat",
    long: "City of Ballarat",
    id: "ballarat",
    id_city_name: "ballarat",
    primary: "ballarat",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.gov.au/geoserver/ballarattrees/wfs?request=GetFeature&typeName=ckan_eabaee3f_a563_449b_a04a_1ec847566ea1&outputFormat=json",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "species",
      common: "common",
      species: "species",
      genus: "() => undefined",
      variety: "variety",
      description: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      maturity: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      ref: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    country: "Australia",
    city: "Manningham",
    short: "Manningham",
    long: "City of Manningham",
    id: "manningham",
    id_city_name: "manningham",
    primary: "manningham",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.gov.au/geoserver/manningham-streettrees/wfs?request=GetFeature&typeName=ckan_1aef5123_24ff_4084_a0f1_a52ca71e9e99&outputFormat=json",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      captured: "date1",
      ref: "tree_no",
      scientific: "species",
      height: "height",
      dbh: "dbh",
    },
  },
  {
    country: "Australia",
    city: "Geelong",
    short: "Geelong",
    long: "City of Greater Geelong",
    id: "geelong",
    id_city_name: "geelong",
    primary: "geelong",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.gov.au/geoserver/geelong-trees/wfs?request=GetFeature&typeName=ckan_13b1196c_7fb7_436a_86bc_ab24c16526de&outputFormat=json",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: '(x) => `${x.genus} ${(x.species || "").toLowerCase()}`',
      common: "common",
      species: "species",
      genus: "genus",
      variety: "variety",
      description: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      maturity: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      ref: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    country: "Australia",
    city: "Melbourne",
    short: "Melbourne",
    long: "City of Melbourne",
    id: "melbourne",
    id_city_name: "melbourne",
    primary: "melbourne",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.melbourne.vic.gov.au/api/views/fp38-wiyy/rows.csv?accessType=DOWNLOAD",
    format: "csv",
    filename: "melbourne.csv",
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "com_id",
      common: "Common Name",
      scientific: "Scientific Name",
      dbh: "Diameter Breast Height",
      planted: "Date Planted",
      maturity: "Age Description",
      ule_min: "Useful Life Expectency",
      location: "Located In",
    },
  },
  {
    country: "Australia",
    city: "Adelaide",
    short: "Adelaide",
    long: "City of Adelaide",
    id: "adelaide",
    id_city_name: "adelaide",
    primary: "adelaide",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "http://opendata.adelaidecitycouncil.com/street_trees/street_trees.csv",
    format: "csv",
    filename: "adelaide.csv",
    gdal_options: "-skipfailures",
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "Asset Id (identifier)",
      dbh: '(x) => `${x["Circum (Inspection)"]} circumference`',
      health: '(x) => "Vigour (Inspection)"',
      height: "Height (Inspection)",
      structure: "Structure (Inspection)",
      maturity: "Age (Inspection)",
      scientific: "Species Name (Inspection)",
      common: "Common Name (Inspection)",
    },
  },
  {
    country: "Australia",
    city: "Waite Arboretum",
    short: "Waite Arboretum",
    long: "Waite Arboretum (Adelaide)",
    id: "waite",
    id_city_name: "waite",
    primary: "waite",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "http://data.sa.gov.au/storage/f/2014-06-23T06%3A12%3A22.180Z/waitetreeid-2014-app-joined-19062014.zip",
    format: "zip",
    filename: "WaiteTreeID_2014_App_Joined_19062014.shp",
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "tree_id",
      scientific: "scientific",
      common: "commonname",
    },
  },
  {
    country: "Australia",
    city: "Burnside",
    short: "Burnside",
    long: "City of Burnside",
    id: "burnside",
    id_city_name: "burnside",
    primary: "burnside",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.sa.gov.au/data/dataset/b7e1c8f6-169c-41bd-b5d7-140395a41c38/resource/6d1912aa-4775-4f5e-b00d-18456ad872a5/download/burnsidetrees.geojson",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "TreeID",
      common: "CommonName",
      height: "TreeHeight",
      scientific: "BotanicalN",
      dbh: "Circumfere",
    },
  },
  {
    country: "Australia",
    city: "Launceston",
    short: "Launceston",
    long: "City of Launceston",
    id: "launceston",
    id_city_name: "launceston",
    primary: "launceston",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "http://lcc.launceston.opendata.arcgis.com/datasets/63b09a3688804a17b0edc4b3b072a0d7_1.zip",
    format: "zip",
    filename: "Trees.shp",
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "objectid",
      common: "name",
      scientific: "genusspeci",
      maturity: "age",
      dbh: "diametr_c",
      height: "height_m",
      crown: "horizontal",
      captured: "auditdate",
    },
  },
  {
    country: "Australia",
    city: "Hobson's Bay",
    short: "Hobson's Bay",
    long: "City of Hobson's Bay",
    id: "hobsons_bay",
    id_city_name: "hobsons_bay",
    primary: "hobsons_bay",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "https://data.gov.au/dataset/80051ffe-04d5-4602-b15b-60e0d0e3d153/resource/ea1ec6fc-02bd-4e36-8e43-c990b6a9268d/download/hbcc_street_and_park_trees.json",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      genus: "Genus",
      species: "Species",
      dbh: "DBH",
      tree_type: "Type",
    },
  },
  {
    country: "Australia",
    city: "Glenelg",
    short: "Glenelg",
    long: "Glenelg Shire",
    id: "glenelg",
    id_city_name: "glenelg",
    primary: "glenelg",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "http://data.gov.au/dataset/3721ad67-7b5b-4815-96b1-9d8b1a89dbd7/resource/b9ff3d44-17b4-4f87-8a28-2d540fa37d8f/download/Glenelg-Street-and-Park-Trees.csv",
    format: "csv",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "scientific",
      common: "common",
      species: "species",
      genus: "genus",
      variety: "variety",
      description: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      maturity: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      ref: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    country: "Australia",
    city: "Southern Grampians",
    short: "Southern Grampians",
    long: "City of Southern Grampians",
    id: "southern_grampians",
    id_city_name: "southern_grampians",
    primary: "southern_grampians",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "http://data.gov.au/geoserver/southern-grampians-street-and-park-trees/wfs?request=GetFeature&typeName=ckan_4a2843f5_8c01_438b_95f3_01ef0a518441&outputFormat=json",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "ref",
      scientific: "species",
      common: "common",
      location: "location",
      height: "height",
      crown: "crown",
      maturity: "maturity",
    },
  },
  {
    country: "Australia",
    city: "Prospect",
    short: "Prospect",
    long: "City of Prospect",
    id: "prospect1",
    id_city_name: "prospect1",
    primary: "prospect1",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.sa.gov.au/data/dataset/5d86d41e-b6c6-47d5-9b88-4d95916c5e76/resource/d1e30913-6e91-4a1f-b576-64120cc4b242/download/city-of-prospect-tree-species-in-reserves-2016.csv",
    format: "csv",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      species: "Tree Species",
      maturity: "Tree Age",
      dbh: '(x) => `${x["Tree Circumference"]} circumference`',
      health: "Tree Health",
      structure: "Tree Structure",
      height: "Tree Height",
    },
  },
  {
    country: "Australia",
    city: "Prospect",
    short: "Prospect",
    long: "City of Prospect",
    id: "prospect2",
    id_city_name: "prospect2",
    primary: "prospect1",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.sa.gov.au/data/dataset/7bf2e4a4-40cc-40fd-83a9-fabb6d854039/resource/3f6be219-d66f-4b40-bfc7-16214fbc0989/download/city-of-prospect-street-trees-2016.csv",
    format: "csv",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { common: "Species Name" },
  },
  {
    country: "Australia",
    city: "Perth",
    short: "Perth",
    long: "City of Perth",
    id: "perth",
    id_city_name: "perth",
    primary: "perth",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://opendata.arcgis.com/datasets/c5ce51d9789a4e9a8510acb8c8f3ecf4_0.zip",
    format: "zip",
    filename: "PKS_AST_TREESMASTER_PV.shp",
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "BOTANICAL_",
      common: "COMMON_NAM",
      family: "FAMILY",
      height: "TREE_HEIGH",
      plant: "DATE_PLANT",
      ref: "TREE_ID",
    },
  },
  {
    country: "Australia",
    city: "Brimbank",
    short: "Brimbank",
    long: "City of Brimbank",
    id: "brimbank",
    id_city_name: "brimbank",
    primary: "brimbank",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.gov.au/geoserver/brimbank-open-space-trees/wfs?request=GetFeature&typeName=ckan_7a57b5a1_2ca3_4171_be91_0d371cefd250&outputFormat=json",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "central_as",
      location: "location",
      genus: "genus",
      species: "species",
      common: "common_nam",
      maturity: "age",
      height: "height",
      crown: "spread",
    },
  },
  {
    country: "Australia",
    city: "Bendigo",
    short: "Bendigo",
    long: "City of Greater Bendigo",
    id: "bendigo",
    id_city_name: "bendigo",
    primary: "bendigo",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.gov.au/geoserver/city-of-greater-bendigo-environment-trees/wfs?request=GetFeature&typeName=ckan_d17c9e50_fab1_40e6_b91d_6e665faf2656&outputFormat=json",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "assetid",
      description: "desc",
      scientific: (x) => x.species.split(" - ")[0],
      common: (x) => x.species.split(" - ")[1],
      variety: (x) => (x.cultivar !== "Not Specified" ? x.cultivar : ""),
    },
  },
  {
    country: "Australia",
    city: "Shepparton",
    short: "Shepparton",
    long: "City of Shepparton",
    id: "shepparton",
    id_city_name: "shepparton",
    primary: "shepparton",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "https://data.gov.au/dataset/e794491f-2eb7-4035-8b0c-f7248c28feda/resource/a1148573-68b9-4bd8-bda4-f08030d38c9d/download/greatersheppartoncitycouncilstreetandparktrees.zip",
    format: "zip",
    filename: "Greater_Shepparton_City_Council_Street_and_Park_Trees.shp",
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "scientific",
      common: "common",
      species: "species",
      genus: "genus",
      variety: "variety",
      description: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      maturity: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      ref: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    country: "Australia",
    city: "Wyndham",
    short: "Wyndham",
    long: "City of Wyndham",
    id: "wyndham",
    id_city_name: "wyndham",
    primary: "wyndham",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "https://data.gov.au/dataset/0254dee0-5b26-484f-a5ae-5ca3cab46601/resource/fb06e7c8-d037-489b-a963-b747271f2e54/download/trees.json",
    format: "zip",
    filename: "OpenData_TI_Trees_LatestInspection.shp",
    gdal_options: "-s_srs unzip/OpenData_TI_Trees_LatestInspection.prj",
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      ref: "tree_id",
      common: "tree_commo",
      height: "height",
      crown: "canopy_wid",
      dbh: "diameter_breast_height",
      maturity: "tree_age",
      health: "health",
      ule: "useful_life_expectancy",
      structure: "structure",
    },
  },
  {
    country: "Australia",
    city: "Port Phillip",
    short: "Port Phillip",
    long: "City of Port Phillip",
    id: "port_phillip",
    id_city_name: "port_phillip",
    primary: "port_phillip",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "https://data.gov.au/dataset/6b72d22b-d824-4281-bd08-ab62e3c38415/resource/9b0d7d55-5267-464b-85d7-3d141d779bab/download/city-of-port-phillip-trees.geojson",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "species",
      common: "common",
      species: "species",
      genus: "genus",
      variety: "variety",
      description: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      maturity: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      ref: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    country: "Australia",
    city: "Boroondara",
    short: "Boroondara",
    long: "City of Boroondara",
    id: "boroondara",
    id_city_name: "boroondara",
    primary: "boroondara",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.gov.au/geoserver/significant-tree/wfs?request=GetFeature&typeName=ckan_14e2b87e_c733_4071_b604_c0cb33d14a42&outputFormat=json",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      species: "botanicaln",
      common: "commonname",
      height: "height",
      crown: "canopyspre",
      health: "health",
      description: "significan",
      location: "locality",
      dbh: (x) => `${x.girth} girth`,
    },
  },
  {
    country: "Australia",
    city: "Yarra",
    short: "Yarra",
    long: "City of Yarra",
    id: "yarra",
    id_city_name: "yarra",
    primary: "yarra",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.gov.au/data/dataset/f3c88ce7-504b-4ef7-907f-686037f7420c/resource/6e4186b0-3e00-48f9-a09c-cb60d1d0d49f/download/yarra-street-and-park-trees.geojson",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "scientific",
      common: "common",
      species: (s) => (s.species || "").replace(/^[A-Z]\\. /, ""),
      genus: "genus",
      variety: "variety",
      description: "description",
      dbh: "dbh",
      crown: "crown",
      height: "height",
      maturity: "maturity",
      health: "health",
      structure: "structure",
      location: "location",
      ref: "ref",
      planted: "planted",
      updated: "updated",
      ule: "ule",
      ule_min: "ule_min",
      ule_max: "ule_max",
    },
  },
  {
    country: "Australia",
    city: "Glen Eira",
    short: "Glen Eira",
    long: "City of Glen Eira",
    id: "glen_eira",
    id_city_name: "glen_eira",
    primary: "glen_eira",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.gov.au/geoserver/street-and-park-trees/wfs?request=GetFeature&typeName=ckan_0553b144_9145_4458_922f_5c6175d2e100&outputFormat=json",
    format: "geojson",
    filename: null,
    gdal_options: null,
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
    country: "Australia",
    city: "Wodonga",
    short: "Wodonga",
    long: "City of Wodonga",
    id: "wodonga",
    id_city_name: "wodonga",
    primary: "wodonga",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://data.gov.au/data/dataset/e7d6ebd3-04a8-4d73-b8ba-a9b82aa79b16/resource/180ba7ad-7bd7-490b-81f8-79c74ec0a915/download/tree.csv",
    format: "csv",
    filename: "wodonga.csv",
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { ref: "field_1", scientific: "field_2", common: "field_3" },
  },
  {
    country: "Australia",
    city: "Hobart",
    short: "Hobart",
    long: "City of Hobart",
    id: "hobart",
    id_city_name: "hobart",
    primary: "hobart",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "http://data-1-hobartcc.opendata.arcgis.com/datasets/d50fa3c9875d43fbb7e462248160e1ee_0.geojson",
    format: "geojson",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
  },
  {
    country: "Australia",
    city: "Sherwood Arboretum",
    short: "Sherwood Arboretum",
    long: "Sherwood Arboretum (Brisbane)",
    id: "sherwood_arboretum",
    id_city_name: "sherwood_arboretum",
    primary: "sherwood_arboretum",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: true,
    download:
      "http://www.spatial-data.brisbane.qld.gov.au/datasets/613169f42b43494499c83640392c43e5_0.geojson",
    format: "geojson",
    filename: null,
    gdal_options: null,
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
    country: "Australia",
    city: "Sydney",
    short: "Sydney",
    long: "City of Sydney",
    id: "sydney",
    id_city_name: "sydney",
    primary: "sydney",
    center: null,
    latitude: null,
    longitude: null,
    info: null,
    srs: null,
    brokenDownload: false,
    download:
      "https://emscycletours.site44.com/opentrees-data/sydney-tree-data.csv",
    format: "csv",
    filename: "sydney.csv",
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: { scientific: "species" },
  },
  {
    country: "Australia",
    city: "Unley",
    short: "Unley",
    long: "Unley",
    id: "unley",
    id_city_name: "unley",
    primary: "unley",
    center: null,
    latitude: null,
    longitude: null,
    info: "http://hub.arcgis.com/datasets/unley::trees/data",
    srs: null,
    brokenDownload: false,
    download:
      "https://opendata.arcgis.com/datasets/910774507d6a42248a50f9922054a0a0_0.zip",
    format: "zip",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      genus: "dom_genus_",
      species: "dom_spcie",
      health: "health",
      structure: "structure",
      maturity: "age",
      ule: "unel___repl",
    },
  },
];
