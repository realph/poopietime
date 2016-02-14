(function() {
  var angular = require('angular');
  var firebase = require('firebase');
  var angularfire = require('angularfire');
  var poopieService = require('./poopieService');

  console.log("hello");

  angular
  .module('poopieApp', ['firebase', 'poopieService'])
  // .service('poopieService', require('./poopieService'))
  .controller('mainCtrl', ['$scope', 'poopieService',
    function($scope, poopieService) {

      // poopieService.getPoopies();
      console.log("another");

      var latitude;
      var longitude;

      var getLocation = function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function(){
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
            });
          });
        }
      }

      getLocation();

      $scope.poopieTime = function() {
        var poopie = {
          actor: "realph",
          time: "Firebase.ServerValue.TIMESTAMP",
          latitude: latitude,
          longitude: longitude
        }

        poopieService.$add(poopie).then(function(ref) {
          var id = ref.key();
          console.log("added poopie with an id " + id);
        }, function(error) {
          console.log("Error: ", error);
        });
      }

    }
  ]);

})();
