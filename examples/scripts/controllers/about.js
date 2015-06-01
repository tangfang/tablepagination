'use strict';

/**
 * @ngdoc function
 * @name tablepaginationApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tablepaginationApp
 */
angular.module('tablepaginationApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
