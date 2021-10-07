module.exports = [
 { 
  id: 'lisbon',
  country: 'Portugal',
  download:
          'https://opendata.arcgis.com/datasets/202d0f1a7f234e449761af8af14436d6_0.zip',
  info:
          'http://geodados.cm-lisboa.pt/datasets/arvoredo?geometry=-9.312%2C38.745%2C-9.148%2C38.768',
  format: 'zip',
  filename: 'Arvoredo.shp',

  crosswalk: {
    scientific: 'ESPECIE_VA',
    location: 'LOCAL',
  },
  short: 'Lisbon',
},
]