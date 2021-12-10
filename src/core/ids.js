import * as constants from "../constants.js";

export const hashcode = (s) => {
  let h = 0;
  let i = s.length;
  while (i > 0) {
    h = ((h << 5) - h + s.charCodeAt(--i)) | 0;
  }
  return Math.abs(h);
};

// This code originally appeared here: https://github.com/sunng87/node-geohash/blob/master/main.js#L127-L161
export const geohashToInt = (latitude, longitude, bitDepth) => {
  bitDepth = bitDepth || 52;

  let bitsTotal = 0;
  let combinedBits = 0;
  let mid = null;
  let maxLat = constants.MAX_LAT;
  let minLat = constants.MIN_LAT;
  let maxLon = constants.MAX_LON;
  let minLon = constants.MIN_LON;

  while (bitsTotal < bitDepth) {
    combinedBits *= 2;
    if (bitsTotal % 2 === 0) {
      mid = (maxLon + minLon) / 2;
      if (longitude > mid) {
        combinedBits += 1;
        minLon = mid;
      } else {
        maxLon = mid;
      }
    } else {
      mid = (maxLat + minLat) / 2;
      if (latitude > mid) {
        combinedBits += 1;
        minLat = mid;
      } else {
        maxLat = mid;
      }
    }
    bitsTotal++;
  }
  return combinedBits;
};

export const IDForTree = (data) => {
  const hashed = geohashToInt(
    data.geometry.coordinates[1],
    data.geometry.coordinates[0],
    52
  );
  return hashcode(
    `${data.properties.sourceID}-${data.properties.common}-${data.properties.scientific}-${hashed}`
  );
};
