// index page -----------------------------------
var index = angular.module('index', ['ng', 'ngMaterial', 'ngAria', 'ngAnimate'])

index.controller('IndexMap', function($scope) {
    $scope.name1 = '';
});

index.controller('IndexSearch', function($scope, $http, $q) {

  $http.get('/api/locdata')
  .then(function(res, err) {
      $scope.locations = res.data
  });

  $scope.searchText = '';



});

index.controller('QuickAddTemp', function($scope) {
    $scope.name1 = '';
});

index.controller('ExtremesNow', function($scope) {
    $scope.name1 = '';
});
