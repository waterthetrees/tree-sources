import mergeFiles from "merge-files";
import * as config from "../config.js";

export const concatenateFiles = async (filepaths) => {
  await mergeFiles(filepaths, config.CONCATENATED_FILEPATH);
};
