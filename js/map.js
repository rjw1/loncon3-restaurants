var centre_lat, centre_long;
var positions = [], markers = [];
var base_url = "http://127.0.0.1/~kake/loncon/";
var icons = {};

var gicon_base = L.Icon.extend( {
    options: {
      shadowUrl: null,
      iconSize: new L.Point( 32, 32 ),
      iconAnchor: new L.Point( 15, 32 ),
      popupAnchor: new L.Point( 0, -29 )
    }
} );

var icon_url_base = 'http://127.0.0.1/~kake/loncon/icons/';

icons.red = new gicon_base( { iconUrl: icon_url_base + 'red-dot.png' } );
icons.blue = new gicon_base( { iconUrl: icon_url_base + 'blue-dot.png' } );
icons.green = new gicon_base( { iconUrl: icon_url_base + 'green-dot.png' } );
icons.yellow = new gicon_base( { iconUrl: icon_url_base + 'yellow-dot.png' } );
icons.blue_red = new gicon_base( { iconUrl: icon_url_base + 'blue-red-dot.png' } );
icons.green_yellow = new gicon_base( { iconUrl: icon_url_base + 'green-yellow-dot.png' } );
icons.red_yellow = new gicon_base( { iconUrl: icon_url_base + 'red-yellow-dot.png' } );

$(
  function() {
    $('#map_canvas').height( $(window).height() - $('#banner').height() );
    map = new L.Map( 'map_canvas' );
    var map_centre = new L.LatLng( centre_lat, centre_long );
    var tile_layer;

    var mq_url = 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png';
    var subdomains = [ 'otile1', 'otile2', 'otile3', 'otile4' ];
    var attrib = 'Data, imagery and map information provided by <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>';

    tile_layer = new L.TileLayer( mq_url, { maxZoom: 18, attribution: attrib, subdomains: subdomains } );

    var zoom = 13;
    map.setView( map_centre, zoom ).addLayer( tile_layer );

    add_markers();
  }
);

function add_marker( i, thing ) {
  var content, marker, position;

  if ( thing.not_on_map ) {
    return;
  }

  position = new L.LatLng( thing.lat, thing.long );
  marker = new L.Marker( position, { icon: icons[thing.marker] } );
  map.addLayer( marker );

  content = '<b>' + thing.name + '</b><br>' + thing.address;
  marker.bindPopup( content );

  markers[ i ] = marker;
  positions[ i ] = position;
}

function show_marker( i ) {
  markers[ i ].openPopup();
  map.panTo( positions[ i ] );
  return false;
}

