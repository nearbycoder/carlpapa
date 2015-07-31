'use strict';

/**
 * @ngdoc function
 * @name carlpapaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the carlpapaApp
 */
angular.module('carlpapaApp')
  .controller('MainController', function ($scope, $http, $location, myConfig, auth) {

    $scope.auth = auth;

    $http.get(myConfig.backend + 'recipe')
      .success(function(data){
        $scope.recipes = [];
        
          for(var i=0;i<data.length;i++){
            $scope.recipes.push({ data: data[i] });
          }
                    
      });

  	$scope.add = function(){      
  		$location.path('add');
  	};

    $scope.modifyRecipe = function(recipeId){
      $location.path(recipeId);
    };

  });
