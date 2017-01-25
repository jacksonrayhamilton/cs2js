'use strict';

var classNames = require('classnames');
var debounce = require('lodash/debounce');

var React = require('react');
var r = React.createElement;

function Compiler () {
  var compiler = new React.Component();

  var compilationDebounceTime = 300;

  var debouncedCompile = debounce(function (code) {
    if (compiler.props.onCoffeeScriptCode) {
      compiler.props.onCoffeeScriptCode(code);
    }
  }, compilationDebounceTime);

  function compileLater (domEvent) {
    // Retrieve the value immediately because React might trash it later.
    var value = domEvent.currentTarget.value;
    debouncedCompile(value);
  }

  compiler.render = function () {
    return (
      r('div', {className: 'cs2js-Compiler'},
        r('div', {className: 'cs2js-Compiler-Row cs2js-Compiler-IORow'},
          r('div', {className: 'cs2js-Compiler-IOColumn'},
            r('h2', {}, 'CoffeeScript in'),
            r('textarea', {className: 'cs2js-Compiler-IO',
                           onChange: compileLater,
                           spellCheck: false})),
          r('div', {className: 'cs2js-Compiler-MiddleColumn'}, '→'),
          r('div', {className: 'cs2js-Compiler-IOColumn'},
            r('h2', {}, 'JavaScript out'),
            r('textarea', {className: 'cs2js-Compiler-IO',
                           value: compiler.props.compiledJavaScriptCode,
                           spellCheck: false}))),
        r('div', {className: classNames(
          'cs2js-Compiler-Row',
          'cs2js-Compiler-ErrorRow',
          {'cs2js-Compiler-ErrorRow-HasError': compiler.props.compilationError}
        )},
         compiler.props.compilationError))
    );
  };

  return compiler;
}

module.exports = Compiler;
