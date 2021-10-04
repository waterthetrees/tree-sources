const createTiles = async (resultsDirectory) => {
  const files = await readdir(path.join(resultsDirectory, "processed"));
  const tippecanoe = spawn(
    "tippecanoe",
    [
      "-o",
      path.join(resultsDirectory, "trees.mbtiles"),
      "-zg",
      "--drop-densest-as-needed",
      ...files.map((f) => path.join(resultsDirectory, "processed", f)),
    ].filter((x) => !!x),
    {
      stdio: ["ignore", "pipe", process.stderr],
    }
  );

  for await (const chunk of tippecanoe.stdout) {
    console.log(chunk);
  }
};
