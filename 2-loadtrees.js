#!/usr/bin/env node --max-old-space-size=8192
/*
Step 2:
  - convert whatever file format we downloaded into newline-delimited geojson
  - look for geometry columns in CSVs
  - deal with projections
  - try hard to end up with valid geometry. occasionally that has to happen in step 3.

*/
const perf = require('execution-time')();
const fs = require('fs');
const childProcess = require('child_process');
const recurseDirs = require('recursive-readdir');
const sources = require('./sources');
const {
  info, error, debug,
} = require('./logger');

const { extensionForSource } = require('./utils');

childProcess.execSync('cp vrt/* data');

perf.start('load');

let skipped = 0;
for await (const [index, source] of sources.entries()) {
// sources.forEach(async (source) => {
  let filename;
  const outname = `tmp/out_${source.id}.nd.geojson`;
  let extraFields = '';
  //   const format = formatForSource(source);
  const extension = extensionForSource(source);
  try {
    filename = source.filename || `${source.id}.${extension}`;

    // ideally we'd redo all the "format: zip" as "format: shp, zip: true".
    // or even just assume zip is true for shp.
    if (extension === 'zip') {
      if (!source.filename) {
        const searchExt = [source.format, 'shp'].find((e) => e && e !== 'zip');
        filename = (await recurseDirs(`data/unzip/${source.id}`)).find((f) => f.match(`${searchExt}$`));
        filename = filename.replace(/^data\//, '');
      }
    } else if (source.loadname) {
      filename = source.loadname;
    }

    if (fs.existsSync(outname)) {
      skipped += 1;
      return;
    }
    if (filename) {
      if (extension === 'csv') {
        source.srs = source.srs || 'EPSG:4326';
        const xFields = source.longitudeField || 'Longitude,Lon,Lng,LONG,X,X_LONG,long,X_Koordina,X-Koordinate,coord long,X_COORD,COORDENADA X';
        const yFields = source.latitudeField || 'Latitude,Lat,LAT,Y,Y_LAT,lat,Y_Koordina,Y-Koordinate,coord lat,Y_COORD,COORDENADA Y';
        const geomFields = source.geometryField || 'the_geom,SHAPE,wkb_geometry,geo_shape,GEOMETRIE,geom';
        extraFields += `-oo GEOM_POSSIBLE_NAMES="${geomFields}" -oo Y_POSSIBLE_NAMES="${yFields}" -oo "X_POSSIBLE_NAMES=${xFields}"`;
      }
      if (source.srs) {
        extraFields = `-s_srs ${source.srs} ${extraFields}`;
      }

      console.log(filename);
      let cmd = `ogr2ogr -t_srs EPSG:4326 -gt 65536 ${extraFields} -f GeoJSONSeq ../${outname} ${source.gdal_options || source.gdalOptions || ''} "${filename}"`;
      console.log(cmd.cyan);
      child_process.execSync(cmd, { cwd: 'data' });
      console.log(`Loaded ${filename}`);
      console.log('Checking for null or bad geometry');
      cmd = `head ${outname} | ndjson-filter '!d.geometry || d.geometry.coordinates[0] < -180 || d.geometry.coordinates[0] > 180 || d.geometry.coordinates[1] < -80 || d.geometry.coordinates[1] > 80' 1>&2`;
      // console.log(cmd.cyan);
      child_process.execSync(cmd);
    }
  } catch (e) {
    console.log(`Error with ${filename} (${source.id})`);
    console.error(e.error);
  }
}
// });
console.log(`Finished converting trees in ${perf.stop('load').words}. Skipped ${skipped} sources.`);
