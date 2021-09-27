#!/usr/bin/env node --max-old-space-size=8192
/*
Step 2:
  - convert whatever file format we downloaded into newline-delimited geojson
  - look for geometry columns in CSVs
  - deal with projections
  - try hard to end up with valid geometry. occasionally that has to happen in step 3.

*/
const perf = require("execution-time")();
const fs = require("fs");
const childProcess = require("child_process");
const recurseDirs = require("recursive-readdir");
const sources = require("../core/sources");

const { extensionForSource } = require("./utils");

childProcess.execSync("cp vrt/* data");

perf.start("load");

const DEFAULT_CRS = "EPSG:4326";

const POSSIBLE_LONGITUDE_FIELDS = [
  "Longitude",
  "Lon",
  "Lng",
  "LONG",
  "X",
  "X_LONG",
  "long",
  "X_Koordina",
  "X-Koordinate",
  "coord long",
  "X_COORD",
  "COORDENADA X",
];

const POSSIBLE_LONGITUDE_FIELDS_STRING = POSSIBLE_LONGITUDE_FIELDS.join(",");

const POSSIBLE_LATITUDE_FIELDS = [
  "Latitude",
  "Lat",
  "LAT",
  "Y",
  "Y_LAT",
  "lat",
  "Y_Koordina",
  "Y-Koordinate",
  "coord lat",
  "Y_COORD",
  "COORDENADA Y",
];

const POSSIBLE_LATITUDE_FIELDS_STRING = POSSIBLE_LATITUDE_FIELDS.join(",");

const POSSIBLE_GEOMETRY_FIELDS = [
  "the_geom",
  "SHAPE",
  "wkb_geometry",
  "geo_shape",
  "GEOMETRIE",
  "geom",
];

const POSSIBLE_GEOMETRY_FIELDS_STRING = POSSIBLE_GEOMETRY_FIELDS.join(",");

const getGDALOptionsForSource = (source, extension) => {
  let result = "";

  if (source.srs) {
    result += `-s_srs ${source.srs}`;
  } else {
    result += `-s_srs ${DEFAULT_CRS}`;
  }

  if (extension !== "csv") {
    return result; // Early Return
  }

  const x = source.longitudeField || POSSIBLE_LONGITUDE_FIELDS_STRING;
  const y = source.latitudeField || POSSIBLE_LATITUDE_FIELDS_STRING;
  const geom = source.geometryField || POSSIBLE_GEOMETRY_FIELDS_STRING;

  return `${result} -oo GEOM_POSSIBLE_NAMES="${geom}" -oo Y_POSSIBLE_NAMES="${y}" -oo "X_POSSIBLE_NAMES=${x}"`;
};

let skipped = 0;
for await (const [_, source] of sources.entries()) {
  let filename;
  const outname = `tmp/out_${source.id}.nd.geojson`;

  const extension = extensionForSource(source);
  try {
    filename = source.filename || `${source.id}.${extension}`;

    // Ideally we'd redo all the "format: zip" as "format: shp, zip: true".
    // or even just assume zip is true for shp.
    if (extension === "zip") {
      if (!source.filename) {
        const searchExt = [source.format, "shp"].find((e) => e && e !== "zip");
        filename = (await recurseDirs(`data/unzip/${source.id}`)).find((f) =>
          f.match(`${searchExt}$`)
        );
        filename = filename.replace(/^data\//, "");
      }
    } else if (source.loadname) {
      filename = source.loadname;
    }

    if (fs.existsSync(outname)) {
      skipped += 1;
      return;
    }

    if (filename) {
      const options = getGDALOptionsForSource(source, extension);
      const command = `ogr2ogr -t_srs EPSG:4326 -gt 65536 ${options} -f GeoJSONSeq ../${outname} ${
        source.gdal_options || source.gdalOptions || ""
      } "${filename}"`;
      childProcess.execSync(cmd, { cwd: "data" });
    }
  } catch (e) {
    console.log(`Error with ${filename} (${source.id})`);
    console.error(e.error);
  }
}
// });
console.log(
  `Finished converting trees in ${
    perf.stop("load").words
  }. Skipped ${skipped} sources.`
);
