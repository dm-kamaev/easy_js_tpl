
# js_tpl
Module for convenient html and css templating. No additional dependencies, pure javascript.
The module to allows you to collect html code in functional style.

```sh
npm i js_tpl -S
```

For example, this code is little dirty:
```js
var html = '<div>';
var list_rows = [{ name: '2017.11', calc: 1200, bold: true }, { name: '2017.12' }];
for (var j = 0, l1 = list_rows.length; j < l1; j++) {
  var row = list_rows[j];
  var row_name = row.name;
  html += '<tr>';
  if (row.calc) {
    var bold = (row.bold) ? 'font-weight:600;' : '';
    html += '<td style=text-align:left;'+bold+'>'+row_name+'</td>';
  } else {
    html += '<td style=text-align:center;background-color:#EEE; colspan=10>'+row_name+'</td>';
  }
}
html+= '</div>';
console.log(html);
```

After using module js_tpl:
```js
const tpl = require('js_tpl');
var html =
  '<div>'+
    tpl.foreach([{ name: '2017.11', calc: 1200, bold: true }, { name: '2017.12' }], function (row) {
      var row_name = row.name;
      return (
        '<tr>'+
          tpl.if(row.calc,
            '<td style=text-align:left;'+tpl.if(row.bold, 'font-weight:600;')+'>'+row_name+'</td>'
          ).else(
            '<td style=text-align:center;background-color:#EEE; colspan=10>'+row_name+'</td>'
          )
      );
    })+
  '</div>';
console.log(html);
```

### foreach(Array, function(value, index): string)
```js
const tpl = require('js_tpl');
var html =
  '<div>'+
    tpl.foreach([ 10, 12, 24], (el, i) => '<p> value='+el+' index='+i+' </p>')+
  '</div>';
console.log(html); // <div><p> value=10 index=0 </p><p> value=12 index=1 </p><p> value=24 index=2 </p></div>
```

### each(Object, function(key, value): string)
```js
const tpl = require('js_tpl');
var obj = {
  a: 10,
  b: 12,
  c: 24
};
var html =
  '<div>'+
    tpl.each(obj, function(key, value) {
      return '<p>' + (key+': '+ value) + '</p>';
    })+
  '</div>';
console.log(html); // <div><p>a: 10</p><p>b: 12</p><p>c: 24</p></div>
```

### if(boolean | function():boolean, string | function)
### .else_if(boolean | function():boolean, string | function)
### .else(string | function)
```js
const tpl = require('js_tpl');
console.log(
  '<div class='+tpl.if(true !== false, 'show')+'>' +
    tpl.if(1 === 1, function() {
      var res = 1+10;
      return '<p>'+res+'</p>';
    })+
  '</div>'+
  tpl.if(() => 2 === 2, '<p>2</p>')
);
// <div class=show>
//  <p>11</p>
// </div>
// <p>2</p>
```

if/elseif/else/
```js
const tpl = require('js_tpl');
var variable = 2;
console.log(
  '<div class='+tpl.if(true === false, 'show').else('hide')+'>' +
    tpl.if(variable === 1, function() {
      return '<p>1</p>';
    }).else_if(variable === 2, () => {
      return '<p>2</p>';
    }).else_if(variable === 3, () => {
      return '<p>3</p>';
    }).else(() => {
      return '<p>else</p>';
    })+
  '</div>'
); // <div class=hide><p>2</p></div>
```

if/elseif/else/ with fixed string
```js
const tpl = require('js_tpl');
var variable = 2;
console.log(
  '<div class='+tpl.if(true === false, 'show').else('hide')+'>' +
    tpl.if(variable === 1, '<p>1</p>')
      .else_if(variable === 2, '<p>2</p>')
      .else('<p>else</p>')+
  '</div>'
); // <div class=hide><p>2</p></div>
```


if/elseif/else/ with conditional function
```js
const tpl = require('js_tpl');
var variable = 2;
console.log(
  '<div class='+tpl.if(true === false, 'show').else('hide')+'>' +
    tpl.if(() => variable === 1, '<p>1</p>')
      .else_if(() => variable === 2, '<p>2</p>')
      .else('<p>else</p>')+
  '</div>'
); // <div class=hide><p>2</p></div>
```


### class(Object): string
switcher for css classes on element
```js
const tpl = require('js_tpl');
var is_auth = true;
console.log(
  '<div>'+
    '<p '+tpl.class({ 'login-in': is_auth, 'login-out': !is_auth })+'></p>'+
  '</div>'
); // <div><p class=login-in></p></div>
```