# Wtt Area

Make tiles out of trees.

## Getting Started

To install the Node.js dependencies:

```bash
npm install
```

These non-npm packages must also be installed:

- [GDAL](https://gdal.org)
- [Tippecanoe](https://github.com/mapbox/tippecanoe) 
  
### macOS

Install GDAL and Tippecanoe via Brew.

### Windows

To install GDAL:

- Install [miniconda](https://docs.conda.io/en/latest/miniconda.html)
- Open *Andaconda Powershell Prompt* from the Start menu  
- In that shell, run `conda install -c conda-forge gdal` to install GDAL
- Follow [these instructions](https://stackoverflow.com/a/58211115/4200446) to get `conda` to run in any shell
- Create a `.env` file in the root of the repo containing `OGR2OGR_COMMAND="conda run ogr2ogr"`, which is the command needed to run `ogr2ogr` on Windows 

## Running

To run the whole pipeline:

```bash
npm run all
```

You can also run each stage of the pipeline independently. A full run does the following:

```bash
npm run download    # downloads all of the source data
npm run convert     # converts all source data into newline delimited GeoJSON
npm run normalize   # normalizes all the converted files
npm run concatenate # smashes all the normalized files together
npm run tile        # builds a vector tile set from the concatenated file
```

We also include a tile server so that you can see the neat things you've made:

```bash
npm run tile-server
```

You will need to have `MAPBOX_API_TOKEN` set in your environment to view your tiles using the tile server.


Forked and refactored from: [opentrees-data](https://github.com/stevage/opentrees-data)
