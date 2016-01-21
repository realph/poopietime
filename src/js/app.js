(function() {
  var angular = require('angular');
  var firebase = require('firebase');
  var angularfire = require('angularfire');

  angular.module('poopieApp', ['firebase'])

  .factory('poopieService', ['$firebaseArray',
    function($firebaseArray) {
      var ref = new Firebase("https://blistering-fire-2693.firebaseio.com");
      var poopiesRef = ref.child("poopies");
      return $firebaseArray(poopiesRef);
    }
  ])

  .controller('mainCtrl', ['$scope', 'poopieService',
    function($scope, poopieService) {

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

      $scope.poopies = poopieService;
    }
  ]);

})();
