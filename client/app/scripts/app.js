'use strict';

/**
 * @ngdoc overview
 * @name carlpapaApp
 * @description
 * # carlpapaApp
 *
 * Main module of the application.
 */
angular
  .module('carlpapaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .state('/:id', {
        url: '/:id',
        templateUrl: 'views/modify.html',
        controller: 'ModifyController'
      });
  }).constant('myConfig', { 'backend':'http://localhost:9090/api/recipe/' });
