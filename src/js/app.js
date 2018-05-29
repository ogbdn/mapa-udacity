function ViewModel() {
  var self = this;
  this.filter = ko.observable();

  this.places = ko.observableArray(locations);

  this.marcadores = ko.observableArray(markers);

  this.visibleIndexs = ko.observableArray([]);

  this.visiblePlaces = ko.computed(function () {

    self.marcadores()
      .forEach(function (marcador) {
        marcador.setVisible(true);
      });

    return this.places()
      .filter(function (place) {

        if (!self.filter() || place.title.toLowerCase()
          .indexOf(self.filter()
            .toLowerCase()) !== -1) {
          return place;
        } else {
          self.marcadores()[place.id].setVisible(false);
        }
      });
  }, this);
  //marker, lat, lng
  this.openInfo = function (data) {
    populateInfowindow(self.marcadores()[data.id], infowindow, map, data.position.lat, data.position.lng);
    toggleBounce(self.marcadores()[data.id]); //Animar o marcador.
  };

}



ko.applyBindings(new ViewModel());
