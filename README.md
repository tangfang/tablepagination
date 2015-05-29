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
 * @description 定义列
 * param text 列头显示的文本
 * param dataIndex 数据索引名称
 * param display 列是否显示
 */
$scope.columns = [{
  text: '客户名',
  dataIndex: 'name',
  display: true
},{
  text: '客户编号',
  dataIndex: 'uuid',
  display: true
}];
//数据模型存储
$scope.store = [{
  uuid: '1001', name: '1001'
},{
  uuid: '1002', name: '1002'
}];
$scope.events = {
  //当表格被选中时回掉函数，参数item是被选中的数据模型
  checked: function(item){
    console.log(item);
  }
};
//分页信息配置
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
//最后一列操作按钮配置
$scope.operation = {
  text: '查看详细',
  click: function(item){
    requestItemInfoById(item.uuid);
  }
};
```
