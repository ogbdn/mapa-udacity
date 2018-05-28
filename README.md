# Projeto Mapas Udacity
## Passo a passo do Projeto

### 1) Instalar as dependências do projeto:
Instalar Bower: npm install -g bower
* Jquery: bower install jquery --save-dev
* Knockout: bower install knockout --save-dev
* gulp: bower install gulp --save dev
* gulp-sass: npm install gulp-sass --save-dev
* browser-sync: npm install browser-sync --save-dev

referencia: https://www.youtube.com/watch?v=rmXVmfx3rNo __

### 2) Criar gulpfile.js na pasta raiz:

referências:

*https://www.npmjs.com/package/gulp-sass

*https://www.youtube.com/watch?v=rmXVmfx3rNo

```
const gulp = require('gulp');
const browserSync = require('browser-sync')
  .create();
const sass = require('gulp-sass');

//compile sass
//https://www.npmjs.com/package/gulp-sass

gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

//Watch and Serve

gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './src'
  })
});

gulp.watch('src/scss/*.scss', ['sass']);
gulp.watch('src/*.htlm')
  .on('change', browserSync.reload);


//Default

gulp.task('default', ['serve']);
```
### 3) Incluir o google maps no arquivo index.html

Passo 1 a 4 ver documentação a seguir para mais detalhes: https://developers.google.com/maps/documentation/javascript/tutorial

3.1 Criar a CHAVE API do google maps API.

3.2 Incluir o script no final do arquivo HTML:

```
<script src="https://maps.googleapis.com/maps/api/js?key=AAPI_Key=initMap" async defer>
</script>

```
3.3 Inserir a tag `<div id="map"></div>` no HTML.

3.4 Inicializar os dados iniciais em model.js. Incluir 5 marcadores que identifiquem pelo menos cinco locais de interesse. O aplicativo deve exibir esses locais por padrão quando a página é carregada.:
** Documentado em: https://developers.google.com/maps/documentation/javascript/markers
```
var map;
var academia = {
  position: {
    lat: -22.9841088,
    lng: -43.2203667
  },
  title: "Academia Bodytech",
  id: 0
};

var shopping_Leblon = {
  position: {
    lat: -22.982322,
    lng: -43.2166887
  },
  title: "Shopping Leblon",
  id: 1
};

var metro_Nossa_Senhora = {
  position: {
    lat: -22.9837028,
    lng: -43.2059733
  },
  title: "Metro da Nossa Senhora da Paz",
  id: 2
};

var bibi_sucos = {
  position: {
    lat: -22.9842592,
    lng: -43.2215961
  },

  title: "Bibi Sucos",
  id: 3
};

var superMercado = {
  position: {
    lat: -22.9813229,
    lng: -43.2224866
  },
  title: "Supermercado Pão de Açucar",
  id: 4
};

var locations = [academia, shopping_Leblon, metro_Nossa_Senhora, bibi_sucos, superMercado];
var markers = [];
```

3.5 Inicializar mapa no arquivo map.js.
```
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -22.982862,
      lng: -43.221561,
    },
    zoom: 15,
    });

    setMarkers(map);

  }; // Fecha initMap()
```

3.6 Configurar o estilo do mapa incluindo a propriedade styles na função initMap():

```
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
```
### 4 Configurar marcadores.
4.1 Dentro da initMap() executar a função `setMarkers(map);` e declará-la em seguida:
```
function setMarkers(map) {

  // adiciona marcadores ao mapa.
  var infowindow = new google.maps.InfoWindow(

  );
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
      }
    })(this, infowindow, map, lat, lng));

    map.fitBounds(bounds);
  }
} //Fecha setMarkers

```
4.2 Declarar a função `populateInfowindow` para inserir informações no infowindow:
```
//Declaração da funcão populateInfowindow

function populateInfowindow(marker, infowindow, map, lat, lng) {
  var url_4s = "https://api.foursquare.com/v2/venues/search?ll=" + lat + "," + lng + "&client_id=ZLMF5SI2BWP4BRSI1GVTTTAZK0QSS5DRKGSWUG4UJN1FYHYU" + "&client_secret=UEEQAYHGSNZ0PO1I5LHQW0LN5BCMPYZPGL2CK0SKIHOILEEO" + "&v=20180523" + "&limit=1";
  var url_street_view = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + lat + "," + lng + "&fov=90&heading=235&pitch=10&key=AIzaSyAiHBSeyuSse7tQctfsNL-L-xk6gFAUIWY";
  var self = this;

  //Requisição na API do forsquare:https://developer.foursquare.com/
  
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

```

### 5) Criar o arquivo app.js
5.1 Utilizar a knockout.js para criar filtro. http://knockoutjs.com/documentation/introduction.html
Em index.html inserir os inputs para o filtro:
```
<!-- Filtro -->
<label for="filter">Filter:</label>
<input id="filter" type="text" data-bind="textInput: filter" />

<ul data-bind="foreach: visiblePlaces">
  <li data-bind="text: title"></li>
</ul>
</div>

```
5.2 Em app.js declarar a função `ViewModel()` e criar uma nova instância em  `ko.applyBindings(new ViewModel());``
```
function ViewModel() {
  var self = this;
  this.filter = ko.observable();

  this.places = ko.observableArray(locations);

  this.marcadores = ko.observableArray(markers);

  this.visibleIndexs = ko.observableArray([]);

  this.visiblePlaces = ko.computed(function () {

    self.marcadores()
      .forEach(function (marcador) {
        marcador.setVisible(false);
      });

    return this.places()
      .filter(function (place) {

        if (!self.filter() || place.title.toLowerCase()
          .indexOf(self.filter()
            .toLowerCase()) !== -1) {
          //  console.log(self.marcadores()[place.id].setVisible(true))


          return place;
        }
      });
  }, this);

}

ko.applyBindings(new ViewModel());

```
___
### SCSS:
Incluir link em index.html para o arquivo style.css `<link rel="stylesheet" type="text/css" href="css/style.css">`

O arquivo gulpfile se encarregará de tranformar o scss em css.

Para referência: [W3School](https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_sidebar)

#### _Outras referências:_

* https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_sidebar
* https://www.w3schools.com/css/css_navbar.asp
* https://www.w3schools.com/css/tryit.asp?filename=trycss_navbar_vertical_fixed

```
$bg-color: green;
$color: black;

html,body{
  background: $bg-color;
  color:$color;
  height: 100%;
  margin: 0;
  padding: 0;
}

#map {
  height: 100%;
  margin-left: 25%;
  overflow: visible;
}

h1 {
  text-align: center;
}

.sidebar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 25%;
  background-color: green;
  height: 100%;
  position: fixed;
}


ul {
  list-style-type: none;
  display: block;
  color: #orange;
  text-decoration: none;
  -webkit-padding-start: 0px;
}

li {
  padding: 8px 0px;
}


li:hover:not(.active) {
  background-color: blue;
  color: grey;
}
```
