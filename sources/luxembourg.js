const country = [
  {
    iso_alpha_2: 'LU',
    iso_alpha_3: 'LUX',
    numeric_country_code: '442',
    country: "Luxembourg",
  }
]

export default [
  {
    iso_alpha_2: 'LU',
    iso_alpha_3: 'LUX',
    numeric_country_code: '442',
    country: "Luxembourg",
    city: "Luxembourg",
    short: "Luxembourg",
    long: "Grand-Duchy of Luxembourg",
    id: "luxembourg",
    id_city_name: "luxembourg",
    main: "luxembourg",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://data.public.lu/en/datasets/inspire-annex-i-theme-protected-sites-remarkable-trees/#_",
    broken: true,
    broken_reason: "Requires outreach to get a compatible file format",
    download:
      "https://download.data.public.lu/resources/inspire-annex-i-theme-protected-sites-remarkable-trees/20220405-122622/ps.protectedsitesnatureconservation-trees.gml",
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
