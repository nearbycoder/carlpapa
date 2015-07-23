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
		$scope.ingredients = [{}];

		$scope.addRecipe = function(){
			var ingredients = [];
			var recipeCompleted = false;

			if($scope.name != null && $scope.name != ''){

				for(var x=0;x < $scope.ingredients.length; x++){

					if($scope.ingredients[x].name == '' || $scope.ingredients[x].name == null){
						console.log(x + " is null or empty. Splicing...")
			 			$scope.ingredients.splice(x, 1);
			 		} 
			 		else {
						console.log(x + ' is not null or empty. Pushing...');
			 			ingredients.push({ name: $scope.ingredients[x].name });	
			 		}

				}

				if(ingredients.length > 0){

					$('.submitButton').hide();
					$http.post(myConfig.backend, {name:$scope.name, ingredients: ingredients, instructions: $scope.instructions})
						.success(function(data){
							console.log('Recipe was added: ' + data[1].recipe.name);
							$location.path('/' + data[1].recipe._id);						

						});
				}
				else{
					$scope.ingredients.push({name: ''});
				}

			}

			

		};

		$scope.appendIngredient = function($index){

			 	for(var x=0; x < $scope.ingredients.length; x++){

			 		if($scope.ingredients[x].name == '' || $scope.ingredients[x].name == null){
			 			$scope.ingredients.splice(x, 1);
			 			x = x - 1;
			 		}
			 	}

			 		$scope.ingredients.push({ name: "" });
			 	
		 };
		
	});