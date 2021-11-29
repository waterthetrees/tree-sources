import geohash from "ngeohash";

export const hashcode = (s) => {
  let h = 0;
  let i = s.length;
  while (i > 0) {
    h = ((h << 5) - h + s.charCodeAt(--i)) | 0;
  }
  return Math.abs(h);
};

export const IDForTree = (data) => {
  const hashed = geohash.encode_int(
    data.geometry.coordinates[1],
    data.geometry.coordinates[0],
    52
  );
  return hashcode(
    `${data.properties.sourceID}-${data.properties.common}-${data.properties.scientific}-${hashed}`
  );
};
