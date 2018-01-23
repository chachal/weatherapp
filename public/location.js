// location page -----------------------------------

var locationMod = angular.module('location', ['ngMaterial'])

locationMod.controller('ctrl2', function($scope, $http) {
   $http.get('/api/locationdata')
   .then(function(res, err) {
        $scope.locs = res.data
    });
});

locationMod.controller('CurrentTemp', function($scope) {
    $scope.name1 = '';
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

locationMod.controller('TempHistoryGraph', function($scope) {
    $scope.name1 = '';
});

locationMod.controller('TempHistoryList', function($scope) {
    $scope.name1 = '';
});
