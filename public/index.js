// index page -----------------------------------
var index = angular.module('index', ['ngMaterial'])

index.controller('IndexMap', function($scope) {
    $scope.name1 = '';
});

// retrieves temperature data from database
index.factory('GetLocationData', function($location, $http) {
    function getData() {
        return $http.get('/api/obsdata')
       .then(function(res, err) {
            var allLocations = res.data;
            return allLocations;
        })};
    return {getData: getData};
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
    $scope.openDialog = function($event) {
        $mdDialog.show( {
            templateUrl: 'quickadd.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose:true
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

// shows recorded min and max temperatures and their location
index.controller('Extremes', function($scope, GetLocationData) {
  var allLocations = GetLocationData.getData();
  allLocations.then(function(allData) {
      $scope.maxTemp = allData[0];
      for (i=0; i < allData.length; i++) {
          var tmp = allData[i];
          if (tmp.temperature > $scope.maxTemp.temperature) {
              console.log("tmp: " + tmp.temperature + " maxTemp: " + $scope.maxTemp.temperature)
              $scope.maxTemp = tmp;
          }
      }
      $scope.minTemp = allData[0];
      for (i=0; i > allData.length; i++) {
          var tmp = allData[i];
          if (tmp.temperature > $scope.minTemp.temperature) {
              $scope.minTemp = tmp;
          }
      }
  })
});
