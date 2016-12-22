mapboxgl.accessToken = 'pk.eyJ1IjoiamFza2lyYXRyIiwiYSI6ImNpd2JmZWlkODA1YXcyb21ocXFiMmZtYWwifQ.x9y8_Vny6lJn3htQYogjlw';

$.getJSON("map-style/dark.json", function(mapStyle) {
  //Replace the default source
  mapStyle.sources = {
    "composite": {
      "type": "vector",
      "tiles": [window.location.href + "osm-nyc/{z}/{x}/{y}.pbf"]
    }
  };

  var bounds = [
    [-74.04728500751165, 40.68392799015035], // Southwest coordinates
    [-73.91058699000139, 40.87764500765852] // Northeast coordinates
  ];

  var map = new mapboxgl.Map({
    container: 'map',
    style: mapStyle,
    center: [-73.9978, 40.7209],
    zoom: 13,
    maxZoom: 14,
    maxBounds: bounds
  });

  map.addControl(new mapboxgl.NavigationControl());
});
