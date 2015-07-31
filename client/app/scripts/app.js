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
    'ngTouch',
    'satellizer'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $authProvider) {
    
    $authProvider.loginUrl = 'http://localhost:9090/api/authenticate';

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .state('add', {
        url: '/add',
        templateUrl: 'views/add.html',
        controller: 'AddController'
      })
      .state(':id', {
        url: '/:id',
        templateUrl: 'views/modify.html',
        controller: 'ModifyController'
      });

  })
  .constant('myConfig', { 'backend':'http://localhost:9090/api/' });
