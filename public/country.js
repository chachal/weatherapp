// country page -----------------------------------

var country = angular.module('country', [])

country.controller('ctrl2', function($scope, $http) {
   $http.get('/api/countrydata')
   .then(function(res, err) {
        $scope.locs = res.data
    });
});

country.controller('currenttemp', function($scope) {
    $scope.name1 = '';
});

country.controller('countryextremes', function($scope) {
    $scope.name1 = '';
});

country.controller('temphistorygraph', function($scope) {
    $scope.name1 = '';
});

country.controller('temphistorylist', function($scope) {
    $scope.name1 = '';
});
