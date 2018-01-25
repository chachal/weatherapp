// location page -----------------------------------
var locationMod = angular.module('location', ['ngMaterial'])

// configures the locationMod module -----------------------------------
locationMod.config(['$locationProvider', function locationConfig($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

// retrieves the current location from the url and location data from database -----------------------------------
locationMod.factory('GetLocationData', function($location, $http) {
    function getData() {
        var currentLocation = {
            'city': $location.search().city,
            'country': $location.search().country
        }
        return $http.get('/api/obsdata', { params: currentLocation })
       .then(function(res, err) {
            currentLocation["locationData"] = res.data;
            return currentLocation;
        })};
    return {getData: getData};
});

// shows current location and current, minimum and maximum temperatures in location -----------------------------------
locationMod.controller('LocationAndTempData', function($scope, GetLocationData) {
    var currentLocation = GetLocationData.getData();
    currentLocation.then(function(currentData) {
        $scope.currentCity = currentData.city;
        $scope.currentCountry = currentData.country;
        var latestEntry = currentData.locationData[0];
        for (i=0; i < currentData.locationData.length; i++) {
            var tmp = currentData.locationData[i];
            if (tmp.created > latestEntry.created) {
                latestEntry = tmp;
            }
        }
        $scope.latestTemp = latestEntry.temperature;
        $scope.minTemp = Math.min.apply(Math, currentData.locationData.map(function(entry) { return entry.temperature; }));
        $scope.maxTemp = Math.max.apply(Math, currentData.locationData.map(function(entry) { return entry.temperature; }));

    })
});

// add a temperature observation to the current location -----------------------------------
locationMod.controller('AddTempDialog', function($scope, $mdDialog) {
  $scope.openDialog = function($event) {
      $mdDialog.show( {
          templateUrl: 'locpagetempadd.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose:true
      })
  }
  $scope.cancel = function() {
      $mdDialog.cancel();
  }
});

// sets initial temperature in add dialog to zero, and submits the observation -----------------------------------
locationMod.controller('SubmitTemp', function($scope, $http, GetLocationData) {
    $scope.observation = {
        temperature: 0
    };
    $scope.submitObservation = function() {
        var currentTime = new Date;
        var entryData = {
            'city': GetLocation.city,
            'country': GetLocation.country,
            'temperature': $scope.observation.temperature,
            'created': currentTime
        }
        $http.post('/api/obsdata', entryData)
        .then(function(res, err) {
            console.log(entryData)
            // flash text or something
        })
    }
});

locationMod.controller('TempHistoryGraph', function($scope) {
    $scope.name1 = '';
});

locationMod.controller('TempHistoryList', function($scope) {
    $scope.name1 = '';
});
