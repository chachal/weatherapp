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

// shows current location and current, minimum and maximum temperatures (last 24 hours)  in location -----------------------------------
locationMod.controller('LocationAndTempData', function($scope, $window, GetLocationData) {

  $scope.goToIndex = function() {
      $window.location.href = '/';
  }

  // updates temperature data on the location page
  $scope.updatePageData = function() {
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
              if (latestEntry) {
                  $scope.latestTemp = latestEntry.temperature + " °C";
              }
              var dayInMilliseconds = 60*60*24*1000;
              var last24Hours = [];
              for (i=0; i < currentData.locationData.length; i++) {
                  var currentTime = new Date;
                  var entryTime = new Date(currentData.locationData[i].created);
                  if (Math.abs(currentTime - entryTime) <= dayInMilliseconds) {
                      last24Hours.push(currentData.locationData[i])
                  }
              }
              if (last24Hours.length > 0) {
                  $scope.minTempInDay = minimumTemperature(last24Hours);
                  $scope.maxTempInDay = maximumTemperature(last24Hours);
              }
              else {
                  $scope.minTempInDay = "No data yet";
                  $scope.maxTempInDay = "No data yet";
              };
              if (currentData.locationData.length > 0) {
                  $scope.minTempEver = minimumTemperature(currentData.locationData);
                  $scope.maxTempEver = maximumTemperature(currentData.locationData);
              }
              else {
                  $scope.minTempEver = "No data yet";
                  $scope.maxTempEver = "No data yet";
              };
      });
  }
  $scope.updatePageData();

  // returns the minimum temperature
  function minimumTemperature(allData) {
      var minTemp = allData[0];
      for (i=0; i < allData.length; i++) {
          var tmp = allData[i];
          if (tmp.temperature < minTemp.temperature) {
              minTemp = tmp;
          }
      }
      return minTemp;
  };

  // returns the maximum temperature
  function maximumTemperature(allData) {
      var maxTemp = allData[0];
      for (i=0; i < allData.length; i++) {
          var tmp = allData[i];
          if (tmp.temperature > maxTemp.temperature) {
              maxTemp = tmp;
          }
      }
      return maxTemp;
  };

});

// add a temperature observation to the current location -----------------------------------
locationMod.controller('AddTempDialog', function($scope, $mdDialog) {
  $scope.openDialog = function($event) {
      $mdDialog.show( {
          templateUrl: 'locpagetempadd.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          scope: $scope,
          preserveScope: true,
          fullscreen: false
      })
  }
  $scope.cancel = function() {
      $mdDialog.cancel();
  }
});

// sets initial temperature in add dialog to zero, and submits the observation -----------------------------------
locationMod.controller('SubmitTemp', function($scope, $http) {
    $scope.observation = {
        temperature: 0
    };
    $scope.submitObservation = function() {
        var currentTime = new Date;
        var entryData = {
            'city': $scope.currentCity,
            'country': $scope.currentCountry,
            'temperature': $scope.observation.temperature,
            'created': currentTime
        }
        $http.post('/api/obsdata', entryData)
        .then(function(res, err) {
            $scope.updatePageData();
        })

    }
});

// opens dialog for list of temperature history for the current location -----------------------------------
locationMod.controller('TempHistoryDialog', function($scope, $mdDialog) {
  $scope.openDialog = function($event) {
      $mdDialog.show( {
          templateUrl: 'tempHistoryList.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          scope: $scope,
          preserveScope: true,
          fullscreen: false
      })
  }
  $scope.cancel = function() {
      $mdDialog.cancel();
  }
});

// shows orderable list of temperature history for the current location -----------------------------------
locationMod.controller('TempHistoryList', function($scope, GetLocationData) {
    var listData = GetLocationData.getData();
    listData.then(function(entryList) {
        $scope.property = 'created';
        $scope.reverse = true;
        $scope.entries = entryList.locationData;
        $scope.sortBy = function(property) {
            $scope.reverse = ($scope.property === property) ? !$scope.reverse : false;
            $scope.property = property;
        }
    })
});
