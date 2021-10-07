module.exports = [  
 {
  id: 'basel',
  country: 'Switzerland',
  short: 'Basel',
  long: '',
  download:
          'https://data.bs.ch/explore/dataset/100052/download/?format=shp&timezone=Australia/Sydney&lang=en',
  info: 'https://data.bs.ch/explore/dataset/100052/information/',
  format: 'zip',
  crosswalk: {
    scientific: (x) => String(x.art).replace(/ \(.*/, ''),
    common: (x) => (String(x.art).match(/\((.*)\)/) || ['', ''])[1],
    planted: 'pflanzdatu',
    age: 'baumalter',
    // STANDJAHR? //
  },
},
  // requires email registration then subsequent download, blergh
 // { 
 //     id:'zurich',
 //     country: 'Switzerland',
 //     short: 'Zurich',
 //     long: '',
 //     download: 'https://www.ogd.stadt-zuerich.ch/geodaten/download/Baumkataster?format=10008',
 //     info:'https://data.stadt-zuerich.ch/dataset/geo_baumkataster',
 //     format: 'csv',
 //     srs: 'EPSG:2056',
 //     crosswalk: {
 //     }
 // },
]