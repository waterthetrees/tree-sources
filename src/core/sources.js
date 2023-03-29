/*
Schema (incomplete):
idSourceName (required): internal identifier used in naming files and linking things.
short: Short name for the city, shown on the map (eg Melbourne)
long: Full name for the government body (eg City of Melbourne)
brokenDownload: Indicates whether the data source is usable
broken_reason: Indicates any reasons for why the source is marked a brokenDownload
download (required): URL to get data from
info: URL that is the landing page for more information about dataset
format: The file extension, eg zip/geojson/csv. Not required if present in download URL.
filename: If the specific file to pass to OGR2OGR needs to be set. Useful for complex zip files, or vrt files.
latitudeField,longitudeField: for csv files, the specific fields containing lat/long. Can usually be guessed, so not required.
license: SPDX specifier for license (eg CC-BY-4.0) or URL
licenseUrl: URL for full text of license
licenseName: longer text version of licence name (eg "Creative Commons Attribution 4.0 International")
crosswalk: set of fields that map to opentrees schema. If a function is given, it's called with geojson properties object.
country: name of country the source is within.
srs: Source SRS if not EPSG:4326 or available within Shapefile .prj file. Passed to ogr2ogr as -s_srs
gdalOptions: String, other options to pass to ogr2ogr, eg "-skipfailures"
delFunc: called with (tree.properties, tree) for each row. If it returns true, that row is excluded.
main: the id of the main datasource for this city (in cases where 2+ datasets constitute the inventory)
keepExtension: don't change the extension of a file when it's downloaded (usually paired with filename=)
centre: [lon, lat] - where to place the city marker, in case the automatic placement is bad due to data errors

Crosswalk (opentrees schema):
scientific: full botanical name
genus: scientific genus (eg Melaleuca)
species: species epithet (eg linariifolia)
variety: everything that comes after species, including cultivar, variety etc.
common: Common name (eg "Brittle gum")
dbh: diameter at breast height, in centimetres
health: rating of health of tree, ideally in Dead/Poor/Fair/Good/Very good/Excellent
height: height of tree in metres
crown: width of crown, in metres
spread: crown spread, in metres (TODO reconcile this and crown)
ule: useful life expectancy, in years (TODO a better way of doing this with absolute years)
updated: date that data was last updated (TOOD distinguish between various kinds of updates maybe)
planted: Date that tree was planted as a seed (not used much - need to be clearer about semantics and date format)
note: Any additional notes about the trees

Future fields:
- installation date?
- language
- units (metric/imperial), assume metric unless US

*/
import path from "path";
import * as utils from "./utils.js";
import * as config from "../config.js";

const filenames = await utils.asyncReadDir(config.SOURCES_DIRECTORY);

const promises = filenames.map((name) => {
  return import(path.join(config.SOURCES_DIRECTORY, name));
});
const imports = await Promise.all(promises);

export const raw = imports.map((m) => m.default).flat();

const sources = raw.map((source) => {
  const extension = utils.extensionForSource(source);
  return {
    ...source,
    destinations: {
      raw: {
        path: path.join(config.RAW_DIRECTORY, `${source.idSourceName}.${extension}`),
        extension,
      },
      rawBackup: {
        path: path.join(config.RAW_BACKUP_DIRECTORY, `${source.idSourceName}.${extension}`),
        extension,
      },
      geojson: {
        path: path.join(config.GEOJSON_DIRECTORY, `${source.idSourceName}.geojsons`),
        extension: "geojsons",
      },
      normalized: {
        path: path.join(config.NORMALIZED_DIRECTORY, `${source.idSourceName}.geojsons`),
        extension: extension,
      },
    },
  };
});

const filterSources = (sourcesArgs) => {
    if (sourcesArgs) {
        return sources.filter(s => sourcesArgs.indexOf(s.idSourceName) != -1);
    }
    return sources;
}

export const all = config.ARGS['sources'] ? filterSources(config.ARGS['sources']) : sources;
export default all.filter((s) => !s.brokenDownload);
