function match(s, regex, patternNo) {
  if (!s) {
    return;
  }
  const m = String(s).match(regex);
  if (m && patternNo !== undefined) {
    return m[patternNo];
  }
  return m;
}

// what format the file is ultimately in
function formatForSource(source) {
  const url = source.download;
  let { format } = source;
  if (!format) {
    format = match(url, /\.([a-z]+)$/i, 1);
  }
  if (format === "zip") {
    format = "shp";
  }
  if (!format) {
    if (match(url, /(shp$|format=shp|\.shp|\.zip)/)) {
      format = "shp";
    } else if (match(url, /(csv$|format=csv|\.csv)/)) {
      format = "csv";
    } else if (
      match(url, /(json$|format=json|geojson$|format=geojson|\.geojson|\.json)/)
    ) {
      format = "geojson";
    }
  }

  if (format === "json") {
    format = "geojson";
  }
  if (!format && source.keepExtension) {
    // eslint-disable-next-line prefer-destructuring
    format = url.match(/\.([^.]+)$/)[1];
  }
  return format;
}

// what file extension the file should be saved to disk
function extensionForSource(source) {
  if (source.zip) {
    return "zip";
  }
  const format = formatForSource(source);
  return format === "shp" ? "zip" : format;
}
module.exports = {
  match,
  formatForSource,
  extensionForSource,
};
