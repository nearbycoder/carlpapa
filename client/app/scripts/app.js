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
    'auth0', 
    'angular-storage', 
    'angular-jwt'
  ])
  .config(function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {


    authProvider.init({
      domain: 'YOUR_NAMESPACE',
      clientID: 'YOUR_CLIENT_ID',
      loginState: 'login' // matches login state
    });


    //

    // We're annotating this function so that the `store` is injected correctly when this file is minified
    jwtInterceptorProvider.tokenGetter = ['store', function(store) {
      // Return the saved token
      return store.get('token');
    }];

    $httpProvider.interceptors.push('jwtInterceptor');

    //
    

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
        controller: 'MainController',
        data: { requiresLogin: true }
      })
      .state('add', {
        url: '/add',
        templateUrl: 'views/add.html',
        controller: 'AddController',
        data: { requiresLogin: true }
      })
      .state(':id', {
        url: '/:id',
        templateUrl: 'views/modify.html',
        controller: 'ModifyController',
        data: { requiresLogin: true }
      });
      
  }).run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
})
  .constant('myConfig', { 'backend':'http://localhost:9090/api/' });
