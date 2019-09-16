#!/usr/local/bin/node

'use strict';

/**
* Methods for template html
* @module 'nodejs/my/tpl.js'
*/
/** @namespace */
const tpl = module.exports;


/**
 * tpl.foreach: for arrays
 * @param  {Array}   array:
 * @param  {Function} handler:
 * @param  {Any}   params:
 * @return {String}
 */
tpl.foreach = function (array, handler, params) {
  var res = '';
  for (var i = 0, l = array.length; i < l; i++) {
    var el = array[i];
    if (el || el === 0) {
      res += handler(el, i, params) || '';
    }
  }
  return res;
};


/**
 * tpl.each: for objects
 * @example
 * tpl.each({ 1: 'Hello', 'string': 2 }, function(key, value) {
 *   console.log(key, value);
 * });
 * @param  {Object}   obj
 * @param  {Function} cb(key, value)
 * @return {String}
 */
tpl.each = function (obj, handler) {
  var res = '';
  var keys = Object.keys(obj);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    res += handler(key, obj[key]);
  }
  return res;
};


// els –– ['margin-top:2px 3 auto 0', 'border-radius:2px solod red']
// return –– "margin-top:2px 3 auto 0;border-radius:2px solod red"
// with_style ––  boolean
tpl.style = function (els, with_style) {
  var res = '';
  if (with_style === true) {
    res += 'style=';
  }
  if (els instanceof Array) {
    res += '"'+els.join('')+'"';
    return res;
  } else {
    console.log('Not valid format for tpl.style => ', els);
    return '';
  }
};
// console.log(tpl.style(['margin-top:2px 3 auto 0', 'border-radius:2px solod red']));


/**
 * if
 * @param  {function(): boolean | boolean} conditon
 * @param  {function(): string | string} if_cb - cb for if
 * @return {function(): string}
*/
tpl.if = function(conditon, if_cb) {
  var else_cb;
  var list_else_if = [];
  // TODO: rewrite to Class
  var obj = {

    /**
     * else_if- optional method
     * @param  {function():boolean}   conditon
     * @param  {function(): string | string} cb
     * @return {obj}
     */
    else_if(conditon, cb) {
      list_else_if.push({ conditon, cb });
      return obj;
    },

    /**
     * else - optional method
     * @param  {function():string} cb
     * @return {obj} return self
     */
    else: (cb) => {
      else_cb = cb;
      return obj;
    },
    toString() {
      conditon = (typeof conditon === 'function') ? conditon() : conditon;
      if (conditon !== '' && conditon !== false && conditon !== null && conditon !== undefined) {
        if (typeof if_cb === 'function') {
          return if_cb();
        } else {
          return (if_cb || '');
        }
      } else {
        var else_if_cb = _search_in_else_if(list_else_if);
        if (typeof else_if_cb === 'function') {
          return else_if_cb();
        } else if (typeof else_if_cb === 'string') {
          return else_if_cb || '';
        }

        if (typeof else_cb === 'function') {
          return else_cb();
        } else {
          return (else_cb || '');
        }

      }
    },
  };

  return obj;
};


/**
 * _search_in_else_if
 * @param  {Array<{ conditon: function():boolean, cb: function():string | string }>} list_else_if
 * @return {boolean}
 */
function _search_in_else_if(list_else_if) {
  if (!list_else_if.length) {
    return false;
  }
  for (var i = 0, l = list_else_if.length; i < l; i++) {
    var el = list_else_if[i];
    var conditon = (typeof el.conditon === 'function') ? el.conditon() : el.conditon;
    if (conditon !== '' && conditon !== false && conditon !== null && conditon !== undefined) {
      return el.cb;
    }
  }
  return false;
}


/**
 * class - generate class attribute for html
 * @param  {{ key: boolean }} obj { test: true, abc: true }
 * @return {string} 'class="test abc"'
 */
tpl.class = function (obj) {
  var res = [];

  var keys = Object.keys(obj);
  for (var i = 0, l = keys.length; i < l; i++) {
    var class_name = keys[i];
    if (obj[class_name]) {
      res.push(class_name);
    }
  }

  if (!res.length) {
    return '';
  } else if (res.length === 1) {
    return 'class='+res[0];
  } else {
    return 'class='+'"'+res.join(' ')+'"';
  }
};


/**
 * is_checked
 * @param  {boolean}  condition
 * @return {string} 'checked=checked' || ''
 */
tpl.is_checked = function (condition) {
  if (condition === true) {
    return 'checked=checked';
  } else {
    return '';
  }
};