'use strict';

/* Controllers */

var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('EnterStuffCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.dbnames = ['HKF', 'S6E07'];

  $scope.getdbnames = function(){
    $http.get("http://localhost:5984/eventdata/_design/byname/_view/Game%20by%20Name")
    .success(function(response) {
      $scope.dbnames = response;
    });
  };

  $scope.fetchgame = function(name){
    $http.get('http://localhost:5984/eventdata/_design/byname/_view/Game%20by%20Name?key="'+ name + '"')
    .success(function(response){

      $scope.formData = response.rows[0].value;
    });
  }
  $scope.savedata = function(){
    if ($scope.selectwhich && $scope.formData.gameName != $scope.selectwhich){
      if($scope.formData._id){
        delete $scope.formData._id ;
      }
      if($scope.formData._rev){
        delete $scope.formData._rev ;
      }
      $scope.selectwhich = $scope.formData.gameName;
    }
    $http({
      method: 'POST',
      url: 'http://localhost:5984/eventdata/',
      data: $scope.formData,
      headers: {'Content-Type': 'application/json'}
    })
    .success(function(response){
      if (response.ok){
        $scope.fetchgame($scope.selectwhich);
      }
      $scope.databaseMessage = response;
    })
    .failure(function(response){
      $scope.databaseMessage = response;
    });

  }

  $scope.writedata = function(){
    $http({
      method: 'POST',
      url: 'http://localhost:8080/pdfs/',
      data: $scope.formData,
      headers: {'Content-Type': 'application/json'}
    });
  }

  
  $scope.mainfields = [
    { 'name' : 'Game Name',
      'type' : 'text',
      'id' : 'gameName',
      'default' :'Unique Name'
    },
    { 'name' : 'Event Name',
      'type' : 'text',
      'id' : 'eventname',
      'default' :'DMK PbP'
    },
    { 'name' : 'Scenario',
      'type' : 'text',
      'id' : 'scenario',
      'default' :'S06E07'
    },
    { 'name' : 'Event Code',
      'type' : 'text',
      'id' : 'eventcode',
      'default' :'51231'
    },
    { 'name' : 'Date',
      'type' : 'text',
      'id' : 'date',
      'default' :'17/11/2014'
    },
    { 'name' : 'GM Signature',
      'type' : 'text',
      'id' : 'gmsig',
      'default' :'DMK'
    },
    { 'name' : 'GM PFS #',
      'type' : 'text',
      'id' : 'gmpfs',
      'default' :'108716'
    }
  ];

  $scope.numbers = [0];
  $scope.formData={};
  $scope.formData.playerData   = [];
  $scope.repeatedfields = [
    { 'name' : 'Player Name',
      'type' : 'text',
      'id' : 'player',
      'default' :''
    },
    { 'name' : 'Character Name',
      'type' : 'text',
      'id' : 'charname',
      'default' :''
    },
    { 'name' : 'PFS#',
      'type' : 'text',
      'id' : 'number',
      'default' :''
    },
    { 'name' : 'Character number',
      'type' : 'text',
      'id' : 'charnumber',
      'default' :''
    },
    { 'name' : 'Faction',
      'type' : 'text',
      'id' : 'faction',
      'default' :''
    },
    { 'name' : 'Tier',
      'type' : 'text',
      'id' : 'tier',
      'default' :''
    },
    { 'name' : 'PP',
      'type' : 'text',
      'id' : 'pp',
      'default' :''
    },
    { 'name' : 'XP',
      'type' : 'text',
      'id' : 'xp',
      'default' :''
    },
    { 'name' : 'GP',
      'type' : 'text',
      'id' : 'gp',
      'default' :''
    },
    { 'name' : 'Day Job',
      'type' : 'text',
      'id' : 'dj',
      'default' :''
    },
    { 'name' : 'Crossouts',
      'type' : 'text',
      'id' : 'crossouts',
      'default' :''
    },
    { 'name' : 'Comments',
      'type' : 'text',
      'id' : 'comment',
      'default' :''
    }

  ];

}]);
