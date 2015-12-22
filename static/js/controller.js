var loginApp = angular.module('loginApp', []);


loginApp.controller('baseCtrl', ['$scope', '$http',
  function ($scope, $http) {
  	$scope.auth_signup = function() {
  		$scope.loginstatusurl = 'partials/signup.html';	
  	}
  	$scope.auth_login = function() {
  		$scope.loginstatusurl = 'partials/login.html';	
  	}
  	$scope.auth_home = function() {
  		$scope.loginstatusurl = 'partials/home.html';	
  	}

  	$scope.auth_home();

  }]);

