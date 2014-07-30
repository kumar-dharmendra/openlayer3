$(document).ready(function(){

  //define view location that will be set default on loading of map
  var view = new ol.View({
    center: ol.proj.transform([-73.55416293442806, 45.509483330306004], 'EPSG:4326', 'EPSG:3857'),
    maxZoom: 19,
    zoom: 17
  });

  //difine tiles type like OSM(open street map) show street map
  var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  //create vector of polygon
  var vector = new ol.layer.Vector({
    source: new ol.source.GeoJSON(),
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#018001',
        width: 2.25
      })
    })
  });

  // creating the map
  var map = new ol.Map({
    layers: [raster, vector],
    target: 'map',
    controls: ol.control.defaults({
      attributionOptions: ({
        collapsible: false
      })
    }),
    view: view
  });

  //register moveend event
  function onMoveEnd(evt) {
    var map_obj = evt.map;
    var extent = map_obj.getView().calculateExtent(map.getSize());
    var custom_url = 'homes/get_coordinates.json?bbox=' + extent.join(',');
    //var custom_url =  "http://dev.webici.idmakina.com/hexa_map/index.js?bbox=" + extent.join(',');
    var new_vector = new ol.layer.Vector({
      source: new ol.source.GeoJSON({
        projection: 'EPSG:3857',
        url: custom_url
      }),
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#018001',
          width: 2.25
        })
      })
    });
    map_obj.addLayer(new_vector);
  }

  map.on('moveend', onMoveEnd);
});
