// index page -----------------------------------
var index = angular.module('index', ['ngMaterial'])

index.controller('IndexMap', function($scope) {
    $scope.name1 = '';
});

index.controller('IndexSearch', function($scope, $http, $window) {
  $http.get('/api/locdata')
  .then(function(res, err) {
      $scope.locations = res.data
  });
  $scope.searchTextChange = function(searchtxt) {
      $scope.matches = [];
      $scope.locations.forEach( function(entry) {
          var location = entry.city + ", " + entry.country;
              if (location.toLowerCase().indexOf(searchtxt.toLowerCase()) >= 0 && searchtxt != ",") {
                  $scope.matches.push(entry);
              }
      })
  }
  $scope.goToLocation = function(selectedLocation) {
      $window.location.href = ('/location?city=' + selectedLocation.city + '&country=' + selectedLocation.country);
  }
});

index.controller('QuickAddTempDialog', function($scope, $mdDialog) {
    $scope.openDialog = function($event) {
        $mdDialog.show( {
            templateUrl: 'quickadd.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose:true
        })
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
});

index.controller('TempInit', function($scope) {
    $scope.observation = {
        temperature: 0
    };
})

index.controller('ExtremesNow', function($scope) {
    $scope.name1 = '';
});
