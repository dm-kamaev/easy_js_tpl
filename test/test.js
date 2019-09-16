#!/usr/local/bin/node

'use strict';

const assert = require('assert');
const tpl = require('../index.js');


describe('tpl.js', function() {

  it('tpl.foreach', function () {
    var list = [ 10, 12, 24];
    var str = tpl.foreach(list, function (el, i, params) {
      return '<p>'+(el+params[i])+'</p>';
    }, list);
    assert.ok(
      str === '<p>20</p><p>24</p><p>48</p>',
      'incorrect string => '+str
    );
  });

  it('tpl.each', function () {
    var obj = { k: 10, k1: 12, k2: 24 };
    var str = tpl.each(obj, function (key, value) {
      return '<p>'+(value+obj[key])+'</p>';
    });
    assert.ok(
      str === '<p>20</p><p>24</p><p>48</p>',
      'incorrect string => '+str
    );
  });

  // it('tpl.style', function () {
  //   var ar = ['margin-top:2px 3 auto 0;', 'border-radius:2px solod red'];
  //   assert.ok(
  //     tpl.style(ar) === '"'+ar.join('')+'"',
  //     'incorrect tpl.style'
  //   );
  //   assert.ok(
  //     tpl.style(ar, true) === 'style="'+ar.join('')+'"',
  //     'incorrect tpl.style'
  //   );
  // });


  it('tpl.if', function () {
    var res;

    res = tpl.if(true, function () {
      return '<p>Hello world!</p>';
    });

    assert.ok(
      res.toString() === '<p>Hello world!</p>',
      'incorrect tpl.if'
    );

    res = tpl.if(false, function () {
      return '<p>Hello world!</p>';
    });
    assert.ok(
      res.toString() === '',
      'incorrect tpl.if'
    );

    res = tpl.if(true, '<p>Hello world!</p>');
    assert.ok(
      res.toString() === '<p>Hello world!</p>',
      'incorrect tpl.if'
    );
  });

  it('tpl.if (part 2)', function () {
    const func_if_elseif_else = function (variable) {
      return tpl.if(() => variable === 'if', () => 'if')
        .else_if(() => variable === 'else if', () => 'else if')
        .else(() => 'else')
      +'';
    };

    assert.ok(
      func_if_elseif_else('if') === 'if',
      'incorrect tpl.if_2'
    );

    assert.ok(
      func_if_elseif_else('else if') === 'else if',
      'incorrect tpl.if_2'
    );

    assert.ok(
      func_if_elseif_else() === 'else',
      'incorrect tpl.if_2'
    );


    const func_if= function (variable) {
      return tpl.if(() => variable === 'if', () => 'if')
      +'';
    };

    assert.ok(
      func_if('if') === 'if',
      'incorrect tpl.if_2'
    );

    assert.ok(
      func_if() === '',
      'incorrect tpl.if_2'
    );


    const func_if_else = function (variable) {
      return tpl.if(() => variable === 'if', () => 'if').else(() => 'else')
      +'';
    };

    assert.ok(
      func_if_else('if') === 'if',
      'incorrect tpl.if_2'
    );

    assert.ok(
      func_if_else() === 'else',
      'incorrect tpl.if_2'
    );


    const func_if_elseif_else_static = function (variable) {
      return tpl.if(variable === 'if', () => 'if')
        .else_if(variable === 'else if', () => 'else if')
        .else(() => 'else')
      +'';
    };

    assert.ok(
      func_if_elseif_else_static('if') === 'if',
      'incorrect tpl.if_2'
    );

    assert.ok(
      func_if_elseif_else_static('else if') === 'else if',
      'incorrect tpl.if_2'
    );

    assert.ok(
      func_if_elseif_else_static() === 'else',
      'incorrect tpl.if_2'
    );

    const func_if_elseif_else_static_2 = function (variable) {
      return tpl.if(variable === 'if', 'if')
        .else_if(variable === 'else if','else if')
        .else('else')
      +'';
    };

    assert.ok(
      func_if_elseif_else_static_2('if') === 'if',
      'incorrect tpl.if_2'
    );

    assert.ok(
      func_if_elseif_else_static_2('else if') === 'else if',
      'incorrect tpl.if_2h'
    );

    assert.ok(
      func_if_elseif_else_static_2() === 'else',
      'incorrect tpl.if_2'
    );
  });


  it('tpl.class', function() {
    assert.ok(
      tpl.class({ test: true, abc: true }) === 'class="test abc"',
      'incorrect tpl.class'
    );

    assert.ok(
      tpl.class({ test: true, abc: false }) === 'class=test',
      'incorrect tpl.class'
    );
  });

});


