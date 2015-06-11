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
<script src="bower_components/tablepagination/build/tablepagination.min.js"></script>
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
<table-pagination columns="columns" store="store" events="events" operation="operation"></table-pagination>
```

The attributes are described as follows:

 * `columns` - The table needs to display the columns (is Array)(is Required). 
 * `store` - The table needs to data store (is Array)(is Required).
 * `events` - This table triggered event(is JSONObject)(Optional). as: `checked` (Return function when the form is selected).
 * `operation` - The table last column operation button configuration (is JSONObject)(Optional):
   - `text` - Button text. (is String)
   - `click` - Button click event. (is Function)

### Add the following code in your controller :

```javascript
/**
 * @description Definition columns
 * @param {String}text Header text
 * @param {Function}getData(data) Receive column data, return the required column values
 * @param {boolean}display show/hide
 */
$scope.columns = [{
  text: 'User Name',
  getData: function(data){
    return data.name;
  },
  display: true
},{
  text: 'Code',
  getData: function(data){
    return data.uuid;
  },
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
  },
  load: function(pagination){
    $scope.pagination = pagination;
    $http.get('json/table-pagination.json').success(function(response){
      $scope.store = response;
    })
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
