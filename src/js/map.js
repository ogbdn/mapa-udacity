function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -22.982862,
      lng: -43.221561,
    },
    zoom: 15,

    styles: [{
        elementType: 'geometry',
        stylers: [{
          color: '#242f3e'
        }]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#242f3e'
        }]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#746855'
        }]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{
          color: '#263c3f'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#6b9a76'
        }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          color: '#38414e'
        }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#212a37'
        }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#9ca5b3'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
          color: '#746855'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#1f2835'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#f3d19c'
        }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#2f3948'
        }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#17263c'
        }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#515c6d'
        }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#17263c'
        }]
      }
    ]
  });
  infowindow = new google.maps.InfoWindow();
  setMarkers(map);



}; // Fecha initMap()

function toggleBounce(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  marker.setAnimation(null);
};

function setMarkers(map) {

  // adiciona marcadores ao mapa.

  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].position;
    var lat = locations[i].position.lat;
    var lng = locations[i].position.lng;
    var title = locations[i].title;

    var marker = new google.maps.Marker({
      position: position,
      title: title,
      map: map,
      animation: google.maps.Animation.DROP,
      id: i
    });

    markers.push(marker);
    bounds.extend(marker.position);

    marker.addListener('click', (function (marker, infowindow, map, lat, lng) {
      return function () {
        populateInfowindow(this, infowindow, map, lat, lng);
        toggleBounce(this); //Animar o marcador.
      }
    })(this, infowindow, map, lat, lng));

    map.fitBounds(bounds);
  }
} //Fecha setMarkers



//Declaração da funcão populateInfowindow

function populateInfowindow(marker, infowindow, map, lat, lng) {
  var url_4s = "https://api.foursquare.com/v2/venues/search?ll=" + lat + "," + lng + "&client_id=ZLMF5SI2BWP4BRSI1GVTTTAZK0QSS5DRKGSWUG4UJN1FYHYU" + "&client_secret=UEEQAYHGSNZ0PO1I5LHQW0LN5BCMPYZPGL2CK0SKIHOILEEO" + "&v=20180523" + "&limit=1";
  var url_street_view = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + lat + "," + lng + "&fov=90&heading=235&pitch=10&key=AIzaSyAiHBSeyuSse7tQctfsNL-L-xk6gFAUIWY";
  var self = this;

  $.ajax({
    type: "GET",
    url: url_4s,
    success: function (result) {
      console.log(result);
      var venue_name = result.response.venues[0].name;
      var venues_address = result.response.venues[0].location.address;
      console.log(venue_name);
      console.log(venues_address);
      infowindow.setContent("<img src='" + url_street_view + "'>" + "<h1>" + venue_name + "</h1>" + "<h2>" + venues_address + "</h2>");

    },
    error: function (jq, status, message) {
      infowindow.setContent('A jQuery error has occurred. Status: ' + status);
    }

  }); //Fecha AJAX

  infowindow.open(map, marker);
  infowindow.addListener('closeclick', function () {
    infowindow.setMarker = null;
  }); // Fecha infowindow.addListener
  console.log("Executou populate");
}; // Fecha função populateInfowindow()
