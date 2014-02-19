var centre_lat, centre_long, map_type;
var positions = [], markers = [];
var base_url = "http://127.0.0.1/~kake/loncon/";

var gicon = L.Icon.extend( {
    options: {
      iconUrl: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png',
      shadowUrl: null,
      iconSize: new L.Point( 32, 32 ),
      iconAnchor: new L.Point( 15, 32 ),
      popupAnchor: new L.Point( 0, -29 )
    }
} );

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

function add_marker( i, thing, type ) {
  var content, marker, position;

  if ( thing.not_on_map ) {
    return;
  }

  position = new L.LatLng( thing.lat, thing.long );

  marker = new L.Marker( position, { icon: new gicon() } );
  map.addLayer( marker );

  if ( type && type == 'venue' ) {
    content = '<b>' + thing.name + '</b>';
  }
  content = content + '<br>' + thing.address;
  if ( type && type == 'venue' ) {
    if ( thing.has_links ) {
      var links = [];
      if ( thing.flickr ) {
        links.push( '<a href="' + thing.flickr + '">Photo</a>' );
      }
      if ( thing.website ) {
        links.push( '<a href="' + thing.website + '">Website</a>' );
      }
      if ( thing.twitter ) {
        links.push( '<a href="https://twitter.com/' + thing.twitter +
                    '">Twitter</a>' );
      }
      content = content + '<br><b>Links: </b>' + links.join( ', ' );
    }
  }

  marker.bindPopup( content );

  markers[ i ] = marker;
  positions[ i ] = position;
}

function show_marker( i ) {
  markers[ i ].openPopup();
  map.panTo( positions[ i ] );
  return false;
}

