'use strict';

angular.module('carlpapaApp')
	.controller('LoginController', function($scope, $auth, $state){
		$scope.login = function(){
			$auth.login({email: $scope.email, password: $scope.password}).then(function(data){
				console.log('request successful');
				$state.go('main', {});
			});
	};

});