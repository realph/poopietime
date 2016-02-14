(function() {
  'use strict';

  module.exports = function($scope, poopieService) {
    // $scope.todo = TodoService.getTodos()[0];
    var ref = new Firebase("https://blistering-fire-2693.firebaseio.com");
    var service = {
        getPoopies: getPoopies
    }

    return service;

    function getPoopies() {
      console.log("coming from the poopieService");

      var poopiesRef = ref.child("poopies");
      return $firebaseArray(poopiesRef);
    }
  };

})();
