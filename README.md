# tablepagination
An extended AngularJS Directive table with radio, checkbox, sort, pagination, and other added features. (supports twitter bootstrap v3).

## Install

```bash
bower install tablepagination --save
```
or Include all neccessary files

```html
<link rel="stylesheet" href="bower_components/bootstrap/dist/bootstrap.min.css" />

<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/tablepagination/dist/tablepagination.min.js"></script>
```

## Documentation

### Configuration

An extended AngularJS Directive table. Configure the directive to your AngularJSApp [`app.js`].

```javascript
angular.module('your app name', [
    ......,
    'tablePagination'
  ]);
```
### Populating a tablePagination using HTML
```html
<table-pagination columns="columns" store="store" events="events" pagination="pagination" operation="operation"></table-pagination>
```

The attributes are described as follows:

 * `columns` - The table needs to display the columns (is Array)(is Required). 
 * `store` - The table needs to data store (is Array)(is Required).
 * `events` - This table triggered event(is JSONObject)(Optional). as: `checked` (Return function when the form is selected).
 * `pagination` - Paging configuration (is JSONObject)(Optional):
   - `total` - Total data.(is Number)
   - `currentPage` - The current page.(is Number)
   - `pageCount` - The total number of pages. (is Number)
   - `goToFirst` - First page button click event. (is Function)
   - `goToPrevious` - Previous page button click event. (is Function)
   - `goToNext` - Next page button click event. (is Function)
   - `goToLast` - Last page button click event. (is Function)
 * `operation` - The table last column operation button configuration (is JSONObject)(Optional):
   - `text` - Button text. (is String)
   - `click` - Button click event. (is Function)

### Add the following code in your controller :

```javascript
/**
 * @description Definition columns
 * @param {String}text Header text
 * @param {String}dataIndex Index name
 * @param {boolean}display show/hide
 */
$scope.columns = [{
  text: 'User Name',
  dataIndex: 'name',
  display: true
},{
  text: 'Code',
  dataIndex: 'uuid',
  display: true
}];
//Data Store
$scope.store = [{
  uuid: '1001', name: '1001'
},{
  uuid: '1002', name: '1002'
}];
$scope.events = {
  //Return function when the form is selected，Param (item) as Data model is selected
  checked: function(item){
    console.log(item);
  }
};
//Paging options
$scope.pagination = {
  total: 0,
  currentPage: 0,
  pageCount: 0,
  goToFirst : function(){
    startpage = 1;
    requestTableDataFunction();
  },
  goToPrevious : function(){
    startpage--;
    requestTableDataFunction();
  },
  goToNext : function(){
    startpage++;
    requestTableDataFunction();
  },
  goToLast : function(){
    startpage = $scope.pagination.pageCount;
    requestTableDataFunction();
  }
};
//The table last column operation button configuration
$scope.operation = {
  text: 'detail',
  click: function(item){
    requestItemInfoById(item.uuid);
  }
};
```
