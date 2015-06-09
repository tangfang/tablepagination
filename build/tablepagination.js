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
      templateUrl: 'bower_components/tablepagination/build/tablepagination.html',
      restrict: 'E',
      scope: {
        columns: '=columns',
        store: '=store',
        events: '=events',
        operation: '=operation'
      },
      link: function postLink(scope) {
        if(!scope.events){

        }else if(scope.events && scope.events.options && scope.events.options.multiSelect){
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

        scope.pagination = {
          total: 0,
          currentPage: 1,
          pageCount: 0,
          pagesize: 10,
          goToFirst : function(){
            this.currentPage = 1;
            scope.events.load(this);
          },
          goToPrevious : function(){
            this.currentPage--;
            scope.events.load(this);
          },
          goToNext : function(){
            this.currentPage++;
            scope.events.load(this);
          },
          goToLast : function(){
            this.currentPage = this.pageCount;
            scope.events.load(this);
          },
          setTotal : function(total){
            this.total = total;
            if (this.total % this.pagesize === 0) {
              this.pageCount = this.total / this.pagesize;
            } else {
              this.pageCount = Math.floor(this.total / this.pagesize) + 1;
            }
          }
        };

        if(scope.events && scope.events.load){
          scope.events.load(scope.pagination);
        }
      }
    };
  });
