// index page -----------------------------------
var index = angular.module('index', ['ngMaterial'])

// retrieves temperature data from database -----------------------------------
index.factory('GetLocationData', function($location, $http) {
    function getData() {
        return $http.get('/api/obsdata')
       .then(function(res, err) {
            var allData = res.data;
            return allData;
        })};
    function getLocations() {
        return $http.get('/api/locdata')
       .then(function(res, err) {
            var allLocations = res.data;
            return allLocations;
        })};
    return {
            getData: getData,
            getLocations: getLocations
            };
});

// autocomplete search & redirect to selected location page -----------------------------------
index.controller('LocationSearch', function($scope, $http, $window) {
  $http.get('/api/locdata')
  .then(function(res, err) {
      $scope.locations = res.data
  });
  $scope.searchTextChange = function(searchtxt) {
      $scope.matches = [];
      $scope.locations.forEach( function(entry) {
          var location = entry.city + ", " + entry.country;
              if (location.toLowerCase().indexOf(searchtxt.toLowerCase()) >= 0 && searchtxt != ",") {
                  $scope.matches.push(entry);
              }
      })
  }
  $scope.goToLocation = function(selectedLocation) {
      $window.location.href = ('/location?city=' + selectedLocation.city + '&country=' + selectedLocation.country);
  }
});

// dialog for quicly adding observations to a selected location -----------------------------------
index.controller('QuickAddTempDialog', function($scope, $mdDialog) {
    $scope.openAddDialog = function($event) {
        $mdDialog.show( {
            templateUrl: 'quickadd.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose:true,
            scope: $scope,
            preserveScope: true,
            fullscreen: false
        })
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
});

// sets initial temperature in quick add dialog to zero, and submits the observation -----------------------------------
index.controller('SubmitTemp', function($scope, $http) {
    $scope.observation = {
        temperature: 0
    };
    $scope.submitObservation = function(selectedLocation) {
        var currentTime = new Date;
        var entryData = {
            'city': selectedLocation.city,
            'country': selectedLocation.country,
            'temperature': $scope.observation.temperature,
            'created': currentTime
        }
        $http.post('/api/obsdata', entryData)
        .then(function(res, err) {
            // flash text or something
        })
    }
});

// opens dialog for list of temperature history for all locations -----------------------------------
index.controller('IndexTempDialog', function($scope, $mdDialog) {
  $scope.openTempDialog = function($event) {
      $mdDialog.show( {
          templateUrl: 'indexTempList.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose: true,
          scope: $scope,
          preserveScope: true,
          fullscreen: false
      })
  }
  $scope.close = function() {
      $mdDialog.cancel();
  }
});

// shows min and max temperatures from the last 24 hours and from all entries, and current temperature for all observation points ) -----------------------------------
index.controller('TempHistory', function($scope, $http, GetLocationData) {
    var allLocations = GetLocationData.getLocations();
    allLocations.then(function(locationList) {
        var allLocsData = GetLocationData.getData();
        allLocsData.then(function(allData) {
            locationList = sortToLocation(locationList, allData);
            locationList = findLatest(locationList);
            $scope.currentMin = locationList[0].latest;
            $scope.currentMax = locationList[0].latest;
            for (i=0; i < locationList.length; i++) {
                if (locationList[i].latest && locationList[i].latest.temperature < $scope.currentMin.temperature) {
                    $scope.currentMin = locationList[i].latest;
                }
                if (locationList[i].latest && locationList[i].latest.temperature > $scope.currentMax.temperature) {
                    $scope.currentMax = locationList[i].latest;
                }
            }
            $scope.lowestEver = minimumTemperature(allData);
            $scope.highestEver = maximumTemperature(allData);
            var last24Hours = getLast24Hours(allData);
            $scope.lowest24Hours = minimumTemperature(last24Hours);
            $scope.highest24Hours = maximumTemperature(last24Hours);
        });
        $scope.currentList = locationList;
    });

  // sort entries to locationList by location
  function sortToLocation(locationList, allData) {
      for (i=0; i < locationList.length; i++) {
          var tmp = [];
          for (j=0; j < allData.length; j++) {
              if (locationList[i].city == allData[j].city && locationList[i].country == allData[j].country) {
                  tmp.push(allData[j]);
              }
          }
          locationList[i].entries = tmp;
      }
      return locationList;
  }

  // find latest entries for each location
  function findLatest(locationList) {
      for (i=0; i < locationList.length; i++) {
          var latest = locationList[i].entries[0];
          for (j=0; j < locationList[i].entries.length; j++) {
                var tmp = locationList[i].entries[j];
                if (tmp.created > latest.created) {
                    latest = tmp;
                }
          }
          locationList[i].latest = latest;
      }
      return locationList;
  }

  function getLast24Hours(allData) {
      var dayInMilliseconds = 60*60*24*1000;
      var last24Hours = [];
      for (i=0; i < allData.length; i++) {
          var currentTime = new Date;
          var entryTime = new Date(allData[i].created);
          if (Math.abs(currentTime - entryTime) <= dayInMilliseconds) {
              last24Hours.push(allData[i])
          }
      }
      return last24Hours;
  }

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

index.controller('IndexTempList', function($scope) {
    $scope.currentData = [];
    for (i=0; i < $scope.currentList.length; i++) {
        $scope.currentData.push($scope.currentList[i].latest);
    }
    $scope.property = 'city';
    $scope.reverse = true;
    $scope.entries = $scope.currentData;
    $scope.sortBy = function(property) {
        $scope.reverse = ($scope.property === property) ? !$scope.reverse : false;
        $scope.property = property;
    }
});
