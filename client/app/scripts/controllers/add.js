'use strict';

/**
 * @ngdoc function
 * @name carlpapaApp.controller:AddController
 * @description
 * # AddController
 * Controller of the carlpapaApp
 */
angular.module('carlpapaApp')
	.controller('AddController', function($scope, $location, $http, myConfig){
		$scope.ingredients = [{},{},{}];

		$scope.appendIngredient = function($index){
			if($index + 1  == $scope.ingredients.length){
				$scope.ingredients.push({ name: ""});
			}

		};

		$scope.addRecipe = function(){
			var ingredients = [];
			var recipeCompleted = false;

			for(var i=0;i<$scope.ingredients.length;i++){
				ingredients.push($scope.ingredients[i]);

				if($scope.name !== undefined && $scope.ingredients[i] !== undefined){
					recipeCompleted = true;
				}

			}

			if(recipeCompleted !== false){
				$('.submitButton').hide();
				$http.post(myConfig.backend, {name:$scope.name, ingredients: ingredients, instructions: $scope.instructions})
					.success(function(data){
						console.log('Recipe was added: ' + data[1].recipe.name);
						$location.path('/' + data[1].recipe._id);						

					});
			}

		};
		
	});