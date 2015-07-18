'use strict';

/**
 * @ngdoc function
 * @name carlpapaApp.controller:ModifyController
 * @description
 * # MainController
 * Controller of the carlpapaApp
 */
 
 angular.module('carlpapaApp')
 	.controller('ModifyController', function($scope, $state, $stateParams, $http, myConfig){
		$http.get(myConfig.backend + $stateParams.id)
			.success(function(data){
				
				$scope.title = data.name;							
				$scope.ingredients = [];
				$scope.instructions = data.instructions;
				
				if(angular.isArray(data.ingredients)){
										
					for(var item=0;item<data.ingredients.length;item++){
						$scope.ingredients.push({ name: data.ingredients[item].name });
				 	}
				} else {					
					$scope.ingredients.push({ name: data.ingredients});
				}
				 
			 });			 
	 });