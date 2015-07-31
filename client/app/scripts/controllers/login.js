'use strict';

angular.module('carlpapaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'auth0', 
    'angular-storage', 
    'angular-jwt'
  ])
	.controller('LoginController', function($scope, $http, auth, store, $state, myConfig){
		
		$scope.login = function(){
			auth.signin({email: $scope.email, password: $scope.password}, function(user, token){

				store.set('user', user);
      			store.set('token', token);
      			$location.path('/');
				

			}, function () {
     				console.log('bad stuff happened');
    			});


	};

});