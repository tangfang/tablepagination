'use strict';

/**
 * @ngdoc function
 * @name tablepaginationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tablepaginationApp
 */
angular.module('tablepaginationApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.userColumns = [{
      text: 'Code',
      dataIndex: 'uuid',
      display: true
    },{
      text: 'Name',
      dataIndex: 'name',
      display: true
    },{
      text: 'Email',
      dataIndex: 'email',
      display: true
    }];
    $scope.events = {
      'checked': function(item){
        console.log(item);
      }
    };

    $http.get('json/table-pagination.json')
      .success(function(response){
        $scope.userStore = response;
      })
      .error(function(er){
        console.log(er);
      });
  });
