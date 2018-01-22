// country page -----------------------------------

var country = angular.module('country', [])

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

country.controller('TempHistoryGraph', function($scope) {
    $scope.name1 = '';
});

country.controller('TempHistoryList', function($scope) {
    $scope.name1 = '';
});
