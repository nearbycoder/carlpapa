'use strict';

/**
 * @ngdoc function
 * @name carlpapaApp.controller:ModifyController
 * @description
 * # MainController
 * Controller of the carlpapaApp
 */
 
 angular.module('carlpapaApp')
 	.controller('ModifyController', function($scope, $timeout, $state, $stateParams, $http, myConfig){
		$http.get(myConfig.backend + $stateParams.id)
			.success(function(data){
				
				$scope.ButtonMsg = "Save Recipe";

				$scope.title = data.name;
				$scope.name = data.name;							
				$scope.ingredients = [];
				$scope.instructions = data.instructions;
				
				if(angular.isArray(data.ingredients)){
										
					for(var item=0;item<data.ingredients.length;item++){
						$scope.ingredients.push({ name: data.ingredients[item].name });
				 	}

				 	$scope.ingredients.push({ name: ""});

				} else {					
					$scope.ingredients.push({ name: data.ingredients});
					$scope.ingredients.push({ name: ""});
				}
				 
			 });	

			 $scope.modifyRecipe = function(){
			 	var newIngredients = [];
			 	var recipeCompleted = false;

			 	for(var x = 0; x < $scope.ingredients.length; x++){
			 		if($scope.ingredients[x].name !== undefined){
			 			newIngredients.push({ name: $scope.ingredients[x].name });	
			 		}			 		

			 		if($scope.name !== undefined && $scope.ingredients[x].name !== undefined){
			 			recipeCompleted = true;
			 		}
			 	}

			 	if(recipeCompleted !== false){
			 		$('.submitButton').hide();
					
					$http.put(myConfig.backend + $stateParams.id, {name: $scope.name, ingredients: newIngredients, instructions: $scope.instructions})
				 		.success(function(data){
				 			$scope.ButtonMsg = "Recipe Saved!";

				 			$timeout(function(){
				 				$scope.ButtonMsg = "Save Recipe";
				 			}, 5000);

				 		}); 		
			 	}


			 };		


			 $scope.appendIngredient = function($index){
			 	//check if all ingredient fields are full
			 	var listIsFull = true;

			 	for(var x=0; x < $scope.ingredients.length; x++){
			 		if($scope.ingredients[x].name === undefined){
			 			console.log($scope.ingredients[x].name + " at " + $index + " is undefined");
			 			listIsFull = false;
			 		}
			 		else{
			 			console.log($scope.ingredients[x].name + " at " + $index + " is defined");
			 		}
			 	}

			 	if(listIsFull === true){
			 		console.log("list is full");
			 		//$scope.ingredients.push({ name: "" });
			 	}
			 	else{
			 		console.log("list is not full");
			 	}
			 }; 
	 });