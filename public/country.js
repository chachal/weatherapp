// country page -----------------------------------

var country = angular.module('country', ['ngMaterial'])

country.controller('ctrl2', function($scope, $http) {
   $http.get('/api/countrydata')
   .then(function(res, err) {
        $scope.locs = res.data
    });
});

country.controller('CurrentTemp', function($scope) {
    $scope.name1 = '';
});

country.controller('CountryExtremes', function($scope) {
    $scope.name1 = '';
});

country.controller('AddTemp', function($scope, $mdDialog) {
  $scope.openDialog = function($event) {
      $mdDialog.show( {
          templateUrl: 'countrytempadd.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose:true
      })
  }
  $scope.cancel = function() {
      $mdDialog.cancel();
  }
});

country.controller('TempHistoryGraph', function($scope) {
    $scope.name1 = '';
});

country.controller('TempHistoryList', function($scope) {
    $scope.name1 = '';
});
