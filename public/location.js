// location page -----------------------------------
var locationMod = angular.module('location', ['ngMaterial'])

locationMod.config(['$locationProvider', function locationConfig($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

locationMod.controller('ctrl2', function($scope, $http) {
   $http.get('/api/locationdata')
   .then(function(res, err) {
        $scope.locs = res.data
    });
});

locationMod.controller('ShowLocation', function($scope, $location) {
    $scope.currentCity = $location.search().city;
    $scope.currentCountry = $location.search().country;
});

locationMod.controller('CurrentTemp', function($scope) {

});

locationMod.controller('LocationExtremes', function($scope) {
    $scope.name1 = '';
});

locationMod.controller('AddTemp', function($scope, $mdDialog) {
  $scope.openDialog = function($event) {
      $mdDialog.show( {
          templateUrl: 'locationtempadd.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose:true
      })
  }
  $scope.cancel = function() {
      $mdDialog.cancel();
  }
});

locationMod.controller('TempInit', function($scope) {
    $scope.observation = {
        temperature: 0
    };
});

locationMod.controller('TempHistoryGraph', function($scope) {
    $scope.name1 = '';
});

locationMod.controller('TempHistoryList', function($scope) {
    $scope.name1 = '';
});
