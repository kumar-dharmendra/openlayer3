$(document).ready(function(){
  var vectorSource = new ol.source.ServerVector({
    format: new ol.format.GeoJSON(),
    loader: function(extent, resolution, projection) {
      console.log(extent);
      new_bbox = ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
      var url = 'http://dev.webici.idmakina.com/hexa_map/index.js?bbox=' + new_bbox.join(',') + 'format_options=callback:loadFeatures';

      $.ajax({
        url: url,
        dataType: 'jsonp',
        crossDomain: true
      }).then(function(response) {
        vectorSource.addFeatures(vectorSource.readFeatures(response));
      });
    },

    projection: 'EPSG:3857'
  });

  var vector = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({color: 'green', width: 1})
    })
  });


  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }), vector
    ],
    view: new ol.View({
      center: ol.proj.transform([-73.55416293442806, 45.509483330306004], 'EPSG:4326', 'EPSG:3857'),
      zoom: 18
    })
  });
});

//NetworkError: 401 Unauthorized - http://dev.webici.idmakina.com/hexa_map/index.json?bbox=-8188707.739602148,5701760.496435283,-8187316.1875698725,5702417.53639888"
//index.j...3639888
//Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://dev.webici.idmakina.com/hexa_map/index.json?bbox=-8188707.739602148,5701760.496435283,-8187316.1875698725,5702417.53639888. This can be fixed by moving the resource to the same domain or enabling CORS.
