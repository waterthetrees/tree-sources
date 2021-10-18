import { spawn } from "child_process";
import * as config from "../config.js";

export const createTiles = async () => {
  return new Promise((resolve, _) => {
    const child = spawn(
      "tippecanoe",
      [
        "-zg",
        "--drop-densest-as-needed",
        "--extend-zooms-if-still-dropping",
        "-l",
        "data",
        "-o",
        config.TILES_FILEPATH,
        config.CONCATENATED_FILEPATH,
      ],
      {
        stdio: ["ignore", process.stdout, process.stderr],
      }
    );
    child.on("exit", resolve);
  });
};
