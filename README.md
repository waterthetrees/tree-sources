# Tree-Source

Make tiles out of trees.

## Getting Started

To install the node.js dependencies:

```bash
npm install
```

We also depend on [GDAL](https://gdal.org) and [Tippecanoe](https://github.com/mapbox/tippecanoe). On Macs, both can be installed through [Homebrew](https://brew.sh).

To install GDAL using Homebrew:

```bash
brew install gdal
```

To install tippecanoe using Homebrew:

```bash
brew install tippecanoe
```

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
npm run save # saves to the db
npm run tile        # builds a vector tile set from the concatenated file
```

We also include a tile server so that you can see the neat things you've made:

```bash
npm run tile-server
```

You will need to have `MAPBOX_API_TOKEN` set in your environment to view your tiles using the tile server.


Forked and refactored from: [opentrees-data](https://github.com/stevage/opentrees-data)
