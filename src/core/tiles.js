import MBTiles from "@mapbox/mbtiles";

export const NewDatabase = async (filepath) => {
  return new Promise((resolve, reject) => {
    new MBTiles(`${filepath}?mode=ro`, (error, database) => {
      if (error) {
        return reject(error);
      }
      return resolve(database);
    });
  });
};

export const getTile = async (database, x, y, z) => {
  return new Promise((resolve, reject) => {
    database.getTile(z, x, y, (error, data, headers) => {
      if (error) {
        return reject(error);
      }
      return resolve({ data, headers });
    });
  });
};
