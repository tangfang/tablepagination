'use strict';

/**
 * @ngdoc overview
 * @name tablepaginationApp
 * @description
 * # tablepaginationApp
 *
 * Main module of the application.
 */
angular
  .module('tablepaginationApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'tablePagination'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
