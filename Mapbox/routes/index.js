var express = require('express');
var router = express.Router();
var MBTiles = require('mbtiles');

// Enable CORS and set correct mime type/content encoding
var header = {
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
  "Content-Type":"application/x-protobuf",
  "Content-Encoding":"gzip"
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mapbox Tile Server' });
});

// Route which handles requests like the following: /<mbtiles-name>/0/1/2.pbf
router.get('/:source/:z/:x/:y.pbf', function(req, res) {
  new MBTiles(( 'data/'+req.params.source + '.mbtiles'), function(err, mbtiles) {
    mbtiles.getTile(req.params.z, req.params.x, req.params.y, function(err, tile, headers) {
      if (err) {
        res.set({"Content-Type": "text/plain"});
        res.status(404).send('Tile rendering error: ' + err + '\n');
      } else {
        res.set(header);
        res.send(tile);
      }
    });
    if (err) console.log("error opening database");
  });
});

module.exports = router;
