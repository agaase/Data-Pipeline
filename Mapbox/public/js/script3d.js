/**
* This script renders the building footprint data available at
https://data.cityofnewyork.us/Housing-Development/Building-Footprints/nqwf-w8eh/data
**/
$.getJSON("map-style/building-footprint.json", function(data) {
    var layer;
    var layers_ = [];
    data['vector_layers'].forEach(function(el) {
      var colorText = "#888888";
      layers_.push({
        id: el['id'] + Math.random(),
        source: 'vector_layer_',
        'source-layer': el['id'],
        interactive: true,
        type: 'line',
        paint: {
          'line-color': colorText,
        }
      });
      layers_.push({
        id: el['id'] + Math.random(),
        source: 'vector_layer_',
        'source-layer': el['id'],
        interactive: true,
        'type': 'fill-extrusion',
        'paint': {
            'fill-extrusion-color': "#888888",
            'fill-extrusion-height': {
                'property': 'heightroof',
                'type': 'identity'
            },
            'fill-extrusion-opacity': 0.8
        }
      }); 
    });

    var bounds = [
      [-74.255495,40.498429], // Southwest coordinates
      [-73.700063,40.91505] // Northeast coordinates
    ];

    var map = new mapboxgl.Map({
      container: 'map',
      center: [-73.9490,40.6723],
      zoom: 12,
      maxZoom: 18,
      minZoom: 12,
      hash: true,
      maxBounds: bounds,
      pitch: 40,
      bearing: 20
    });

    map.setStyle({
      version: 8,
      sources: {
        'vector_layer_': {
          type: 'vector',
          tiles: data['tiles'],
          minzoom: data['minzoom'],
          maxzoom: data['maxzoom']
        }
      },
      layers: layers_
    });

  map.addControl(new mapboxgl.NavigationControl());
});
