# Creating 2.5D Map with your own tile server

## Summary
Our goal is to render open source spatial datasets through [Mapbox-GL](https://www.mapbox.com/mapbox-gl-js/api/).
- The available [NYC Planimetrics](https://nycitymap.wordpress.com/tag/planimetrics/) data is in `GML files`.
- We'll convert that to `.mbtiles/.mvt` mapbox-vector-tiles. Intermediate steps may require conversion of `GML -> .shp -> .mbtiles`
- These tiles will be served by nodejs tileserver
- On client side the tiles will be rendered with mapbox.

## Datasets
For this example we'll use sample data from [osm2vectortiles](http://osm2vectortiles.org/)

- Sample Dataset : [New York](https://osm2vectortiles-downloads.os.zhdk.cloud.switch.ch/v2.0/extracts/new-york_new-york.mbtiles)
- [NYC Planimetrics](https://nycitymap.wordpress.com/tag/planimetrics/)

## Requirements
Latest Nodejs version
`npm install --save mbtiles`

## Setup
- Clone this repository
```
git clone https://github.com/UrbanEcologyLab/Data-Pipeline.git
cd Data-Pipeline/Mapbox
npm install
node app.js
```
- [Download sample data](https://osm2vectortiles-downloads.os.zhdk.cloud.switch.ch/v2.0/extracts/new-york_new-york.mbtiles) and save it as `osm-nyc.mbtiles` in `Mapbox/data`

*Note: Any .mbtiles data must be vector tiles format; NOT raster*

This example uses `dark style` theme. To download other styles [here is the guide](https://www.mapbox.com/blog/mapbox-studio-style-archive/)

## Debug: View tiles without Mapbox
To simple load tiles in your browser, use `tileserver-gl-light`
```
npm install -g tileserver-gl-light
cd data
tileserver-gl-light osm-nyc.mbtiles
```
Open your browser pointed to `http://localhost:8080`
Go to X-Ray view to explore the tiles.

*Note:* `tileserver-gl` is also available but is not compatible with windows. You'll need a docker container to run it. [Read more here](https://github.com/klokantech/tileserver-gl)

*Another Option* Not tested yet: [Mapbox MBview](https://github.com/mapbox/mbview)

## TODO
The current sample data (.mbtiles) does not have building heights attribute.
@Aseem: Data coversion from NYC Planimetrics/ MAPPLUTO to MBtiles. This will allow us to extrude building footprint.
- You can use `QGIS`([Download](http://www.qgis.org/en/site/forusers/download.html)) to convert `GML -> .shp`
- To convert `.shp -> .mbtiles`
  - Use tilemill to generate mbtiles. (This creates raster tiles)
  - [mapbox-tile-copy](https://github.com/mapbox/mapbox-tile-copy) : Create tiles from .mbtiles directly on s3 bucket
  - [tippecanoe](https://github.com/mapbox/tippecanoe)
- More resources here: [Awesome Vector Tiles](https://github.com/mapbox/awesome-vector-tiles)


## Updates 

### 12/30/2016 - Rendering 3d data set by adding layer to extrude building footprint
The data set at [NYC open data](https://data.cityofnewyork.us/Housing-Development/Building-Footprints/nqwf-w8eh/data) gives building footprint along with height attribute. 

To use this new data set, custom style has to be passed to the map. The building-footprint.json defines the basic configuration of the data set being used here. That is passed to the script (script3d.js) which defines two layers; one for the basic 2d footprint of the building and the other for the height extrusion.

To run this example 
- Download the geoJSON building footprint data from [NYC open data](https://data.cityofnewyork.us/Housing-Development/Building-Footprints/nqwf-w8eh/data).
- Using tippecanoe, convert this geoJSON data to mbtiles by using the command `tippecanoe -z 14 -Z 7 -o building_footprint.mbtiles Building\ Footprints.geojson`
- Put the data file under data folder 
- Change index.pug to use script3d.js instead of script.js

