// index page -----------------------------------

var index = angular.module('index', [])

index.controller('indexmap', function($scope) {
    $scope.name1 = '';
});

index.controller('indexsearch', function($scope, $http) {
   $http.get('/api/locdata')
   .then(function(res, err) {
        $scope.location = res.data
    });
});

index.controller('extremesnow', function($scope) {
    $scope.name1 = '';
});

index.controller('quickaddtemp', function($scope) {
    $scope.name1 = '';
});
