// index page -----------------------------------

var index = angular.module('index', [])

index.controller('IndexMap', function($scope) {
    $scope.name1 = '';
});

index.controller('IndexSearch', function($scope, $http) {
   $http.get('/api/locdata')
   .then(function(res, err) {
        $scope.locations = res.data
    });
});
/*
index.controller('IndexSearch', ['$scope', '$http', IndexSearch]);

function IndexSearch($scope, $http) {
   $http.get('/api/locdata')
   .then(function(res, err) {
        $scope.locations = res.data
    });
};*/

index.controller('QuickAddTemp', function($scope) {
    $scope.name1 = '';
});

index.controller('ExtremesNow', function($scope) {
    $scope.name1 = '';
});
