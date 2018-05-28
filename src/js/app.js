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
