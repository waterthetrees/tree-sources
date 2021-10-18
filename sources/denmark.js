export default [
  {
    id: "copenhagen",
    country: "Denmark",
    download:
      "http://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:trae_basis&outputFormat=csv&SRSNAME=EPSG:4326",
    info: "https://www.opendata.dk/city-of-copenhagen/trae_basis",
    format: "csv",
    crosswalk: {
      scientific: "traeart",
      common: "dansk_navn",
      // Slaegstnavn "family name" has values like Lind
      planted: "planteaar",
      // Stammeofma "tribal embrace(?)" - crown?,
      health: "sundhed",
      // TODO sooo many other fields
    },
    short: "Copenhagen",
  },
];
