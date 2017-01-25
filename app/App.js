'use strict';

var uniqueId = require('lodash/uniqueId');

var React = require('react');
var r = React.createElement;

var Compiler = require('./Compiler');

function App () {
  var app = new React.Component();

  app.state = {
    compiledCode: ''
  };

  var compilerWorker;
  var lastJob;

  function compileCode (code) {
    lastJob = uniqueId();
    compilerWorker.postMessage({
      action: 'compile',
      job: lastJob,
      codeToCompile: code
    });
  }

  function initializeCompilerWorker () {
    compilerWorker = new Worker('CompilerWorker.js');
    compilerWorker.addEventListener('message', function (messageEvent) {
      var data = messageEvent.data;
      if (data.action === 'compile' && data.job === lastJob) {
        app.setState({
          compiledCode: !data.error ? data.compiledCode : app.state.compiledCode,
          compilationError: data.error ? data.error : undefined
        });
      }
    });
  }

  app.componentDidMount = function () {
    initializeCompilerWorker();
  };

  app.render = function () {
    return (
      r('div', {className: 'cs2js-App'},
        r('main', {className: 'cs2js-App-Main'},
          r('h1', {className: 'cs2js-App-MainHeading'}, 'CoffeeScript to JavaScript'),
          r(Compiler, {
            onCoffeeScriptCode: compileCode,
            compiledJavaScriptCode: app.state.compiledCode,
            compilationError: app.state.compilationError
          })))
    );
  };

  return app;
}

module.exports = App;
