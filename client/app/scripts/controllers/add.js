'use strict';

/**
 * @ngdoc function
 * @name carlpapaApp.controller:AddController
 * @description
 * # AddController
 * Controller of the carlpapaApp
 */
angular.module('carlpapaApp')
	.controller('AddController', function($scope, $http, myConfig){
		$scope.ingredients = [{},{},{}];

		/*
		$scope.submit = function(){
			var ingredients = [];
			var recipeCompleted = false;

			for(var i=0;i<$scope.ingredients.length;i++){
				ingredients.push($scope.ingredients[i]);

				if($scope.recipeName !== undefined && $scope.ingredients[i] !== undefined)
					recipeCompleted = true;

			}

			if(recipeCompleted !== false){
				$('.submitButton').hide();
				$http.post(myConfig.backend, {name:$scope.ingredientName, ingredients: ingredients, instructions: $scope.instructions})
					.success(function(data){
						$scope.location = window.location.protocol + window.location.host + '/' + data[1].recipe._id
					});
			}

		};
		*/
	});