<<<<<<< HEAD
module.exports = [

  
  {
    id:'umea',
    country: 'Sweden',
    short: 'Umea',
    long: '',
    download: 'https://opendata.umea.se/explore/dataset/trad-som-forvaltas-av-gator-och-parker/download/?format=shp&timezone=Europe/Stockholm&lang=en',
    info:'https://opendata.umea.se/explore/dataset/trad-som-forvaltas-av-gator-och-parker/export/?disjunctive.tradart_vetenskap_namn_1_1_2&disjunctive.tradart_svenskt_namn_1_1_3',
    format: 'zip',
    crosswalk: {
        scientific: 'tradart_vet',
        common: 'tradart_sve',
        location: 'gatu_eller',
        date: 'planterings',
    }
},
{
    id: 'tradportalen',
    info: 'https://www.tradportalen.se/Summary.aspx',
    download: 'https://tradportalen.s3.eu-north-1.amazonaws.com/tradportalen.zip',
    format: 'zip',
    filename: 'data/combined.json',
    short: 'Trädportalen',
    long: 'Trädportalen',
    country: 'Sweden',
    crosswalk: {
      scientific: x => String(x.Species).split(', ')[1],
      common: x => String(x.Species).split(', ')[0],
      height: 'Height',
      dbh: x => Number(x['TrunkCircumference']) / 3.14159 * 2,
    },
    country: 'Sweden'
  }
]
=======
export default [
  {
    country: "Sweden",
    city: "Umea",
    short: "Umea",
    long: "Umea",
    id: "umea",
    id_city_name: "umea",
    primary: "umea",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://opendata.umea.se/explore/dataset/trad-som-forvaltas-av-gator-och-parker/export/?disjunctive.tradart_vetenskap_namn_1_1_2&disjunctive.tradart_svenskt_namn_1_1_3",
    srs: null,
    brokenDownload: false,
    download:
      "https://opendata.umea.se/explore/dataset/trad-som-forvaltas-av-gator-och-parker/download/?format=shp&timezone=Europe/Stockholm&lang=en",
    format: "zip",
    filename: null,
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: "tradart_vet",
      common: "tradart_sve",
      location: "gatu_eller",
      date: "planterings",
    },
  },
  {
    country: "Sweden",
    city: "Trädportalen",
    short: "Trädportalen",
    long: "Trädportalen",
    id: "tradportalen",
    id_city_name: "tradportalen",
    primary: "tradportalen",
    center: null,
    latitude: null,
    longitude: null,
    info: "https://www.tradportalen.se/Summary.aspx",
    srs: null,
    brokenDownload: false,
    download:
      "https://tradportalen.s3.eu-north-1.amazonaws.com/tradportalen.zip",
    format: "zip",
    filename: "data/combined.json",
    gdal_options: null,
    license: null,
    email: null,
    contact: null,
    crosswalk: {
      scientific: '(x) => String(x.Species).split(", ")[1]',
      common: '(x) => String(x.Species).split(", ")[0]',
      height: "Height",
      dbh: "(x) => (Number(x.TrunkCircumference) / 3.14159) * 2",
    },
  },
];
>>>>>>> f6f6864a5e38638b7899216b85e7d14a9ed24c56
