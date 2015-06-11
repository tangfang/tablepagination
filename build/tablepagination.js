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
      // templateUrl: 'bower_components/tablepagination/build/tablepagination.html',
      template: '<table class="table table-striped table-bordered table-hover">'+
                  '<thead>'+
                    '<tr class="heading">'+
                      '<th ng-if="events"></th>'+
                      '<th ng-repeat="column in columns" ng-hide="!column.display" ng-bind="column.text"></th>'+
                      '<th ng-if="operation">操作</th>'+
                    '</tr>'+
                  '</thead>'+
                  '<tbody>'+
                    '<tr ng-repeat="data in store" ng-click="checked(data)" ng-class="{\'active\': data.selected == true}">'+
                      '<td ng-if="events">'+
                        '<div class="checker">'+
                          '<span ng-class="{\'checked\':(data == checkItem) || (data.selected == true)}"><input type="checkbox" checked /></span>'+
                        '</div>'+
                      '</td>'+
                      '<td ng-repeat="column in columns" ng-hide="!column.display" ng-bind="column.getData(data)" ></td>'+
                      '<td ng-if="operation">'+
                        '<a ng-click="operation.click(data)" class="btn default btn-xs green-stripe" ng-bind="operation.text"></a>'+
                      '</td>'+
                    '</tr>'+
                  '</tbody>'+
                '</table>'+
                '<div class="row" ng-if="events.load">'+
                  '<div class="col-md-5 col-sm-12">'+
                    '<div class="dataTables_info">共{{pagination.total}}条记录,当前第{{pagination.currentPage}}页,共{{pagination.pageCount}}页</div>'+
                  '</div>'+
                  '<div class="col-md-7 col-sm-12"><div class="dataTables_paginate paging_bootstrap_full_number">'+
                    '<ul class="pagination">'+
                      '<li class="prev"><a class="btn" ng-disabled="pagination.currentPage <= 1" ng-click="pagination.goToFirst()"><span class="hidden-480">首页</span></a></li>'+
                      '<li class="prev"><a class="btn" ng-disabled="pagination.currentPage <= 1" ng-click="pagination.goToPrevious()"><span class="hidden-480">前页</span></a></li>'+
                      '<li class="next"><a class="btn" ng-disabled="pagination.currentPage >= pagination.pageCount" ng-click="pagination.goToNext()"><span class="hidden-480">后页</span></a></li>'+
                      '<li class="next"><a class="btn" ng-disabled="pagination.currentPage == pagination.pageCount" ng-click="pagination.goToLast()"><span class="hidden-480">末页</span></a></li>'+
                    '</ul>'+
                  '</div>'+
                  '</div>'+
                '</div>',
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
