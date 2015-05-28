'use strict';

/**
 * @ngdoc directive
 * @name tablePagination.directive:tablePagination
 * @description
 * # tablePagination
 */
angular.module('tablePagination', []);
angular.module('tablePagination')
  .directive('tablePagination', function () {
    return {
      templateUrl: 'bower_components/tablepagination/src/tablepagination.html',
      restrict: 'E',
      scope: {
        columns: '=columns',
        store: '=store',
        events: '=events',
        pagination: '=pagination',
        operation: '=operation'
      },
      link: function postLink(scope) {
        if(scope.events && scope.events.options && scope.events.options.multiSelect){
          var selectHash = {};
          scope.checked = function(data){
            if(data.selected === undefined){
              data.selected = false;
            }
            data.selected = !data.selected;
            if(data.selected){
              selectHash[data.$$hashKey] = data;  
            }else{
              selectHash[data.$$hashKey] = null;
            }
            var selected = [];
            angular.forEach(selectHash, function(value){
              if(value){
                this.push(value);  
              }
            }, selected);
            if(scope.events.checked){
              scope.events.checked(selected);  
            }
          };
        }else if(scope.events && scope.events.checked){
          //checkbox选中
          scope.checked = function(data){
            scope.checkItem = data;
            scope.events.checked(data);
          };  
        }
      }
    };
  });
