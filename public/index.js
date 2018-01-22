// index page -----------------------------------
var index = angular.module('index', ['ng', 'ngMaterial', 'ngAria', 'ngAnimate'])

index.controller('IndexMap', function($scope) {
    $scope.name1 = '';
});

index.controller('IndexSearch', function($scope, $http, $q, $log) {

  $http.get('/api/locdata')
  .then(function(res, err) {
      $scope.locations = res.data
  });

  $scope.searchTextChange = function(searchtxt) {
      $scope.matches = [];
      $scope.locations.forEach( function(entry) {
          if (entry.city.toLowerCase().indexOf(searchtxt) >= 0) {
              $scope.matches.push(entry);
          }
      })
  }


});

index.controller('QuickAddTemp', function($scope) {
    $scope.name1 = '';
});

index.controller('ExtremesNow', function($scope) {
    $scope.name1 = '';
});
