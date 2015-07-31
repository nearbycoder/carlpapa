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


    authProvider.init({
      domain: 'carlpapa.auth0.com',
      clientID: 'M8hUFGA5AyVcLhP8wcadixPm2QQtaLbq',
      loginUrl: '/login' // matches login state
    });


    //

    // We're annotating this function so that the `store` is injected correctly when this file is minified
    jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');


    $httpProvider.interceptors.push('jwtInterceptor');

    //
    

    
      
  }).run(function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          $location.path('/login');
        }
      }
    }

  });
})
  .constant('myConfig', { 'backend':'http://localhost:9090/api/' });
