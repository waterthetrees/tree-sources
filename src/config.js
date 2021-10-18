import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Paths -----------------------------------------------------------------------
const __dirname = path.dirname(import.meta.url.split(":")[1]);
export const ROOT_DIRECTORY = path.join(__dirname, "..");
export const SOURCES_DIRECTORY =
  process.env.SOURCES_DIRECTORY || path.join(ROOT_DIRECTORY, "sources");
export const DATA_DIRECTORY =
  process.env.DATA_DIRECTORY || path.join(ROOT_DIRECTORY, "data");
export const RAW_DIRECTORY =
  process.env.RAW_DIRECTORY || path.join(DATA_DIRECTORY, "raw");
export const GEOJSON_DIRECTORY =
  process.env.DATA_DIRECTORY || path.join(DATA_DIRECTORY, "geojson");
export const NORMALIZED_DIRECTORY =
  process.env.NORMALIZED_DIRECTORY || path.join(DATA_DIRECTORY, "normalized");
export const CONCATENATED_FILEPATH =
  process.env.CONCATENATED_FILEPATH ||
  path.join(DATA_DIRECTORY, "concatenated.geojsons");
export const TILES_FILEPATH =
  process.env.TILES_FILEPATH || path.join(DATA_DIRECTORY, "trees.mbtiles");
export const SERVER_INDEX_FILEPATH =
  process.env.SERVER_INDEX_FILEPATH ||
  path.join(ROOT_DIRECTORY, "src/html/index.html");

// Data ------------------------------------------------------------------------
export const DEFAULT_CRS = "EPSG:4326";

export const POSSIBLE_LONGITUDE_FIELDS = [
  "Longitude",
  "Lon",
  "Lng",
  "lon",
  "LONG",
  "X",
  "X_LONG",
  "long",
  "X_Koordina",
  "X-Koordinate",
  "coord long",
  "X_COORD",
  "COORDENADA X",
  "feat_cent_east",
  "Easting",
  "Easting (Location/Map Coordinates)",
  "field_5",
];

export const POSSIBLE_LONGITUDE_FIELDS_STRING =
  POSSIBLE_LONGITUDE_FIELDS.join(",");

export const POSSIBLE_LATITUDE_FIELDS = [
  "Latitude",
  "Lat",
  "LAT",
  "lat",
  "Y",
  "Y_LAT",
  "lat",
  "Y_Koordina",
  "Y-Koordinate",
  "coord lat",
  "Y_COORD",
  "COORDENADA Y",
  "feat_cent_north",
  "Northing",
  "Northing (Location/Map Coordinates)",
  "field_6",
];

export const POSSIBLE_LATITUDE_FIELDS_STRING =
  POSSIBLE_LATITUDE_FIELDS.join(",");

export const POSSIBLE_GEOMETRY_FIELDS = [
  "the_geom",
  "SHAPE",
  "wkb_geometry",
  "geo_shape",
  "GEOMETRIE",
  "geom",
];

export const POSSIBLE_GEOMETRY_FIELDS_STRING =
  POSSIBLE_GEOMETRY_FIELDS.join(",");

// Server ----------------------------------------------------------------------
export const PORT = process.env.PORT || 3030;
export const MAPBOX_API_TOKEN = process.env.MAPBOX_API_TOKEN;
