/* eslint-env worker */

'use strict';

var CoffeeScript = require('coffee-script');

function compile (code) {
  return CoffeeScript.compile(code, {bare: true});
}

function serializeError (error) {
  return error.name + ': ' + error.message;
}

addEventListener('message', function (messageEvent) {
  var data = messageEvent.data;
  if (data.action === 'compile') {
    var compiledCode;
    var compilationError;
    try {
      compiledCode = compile(data.codeToCompile);
    } catch (error) {
      compilationError = error;
    }
    postMessage({
      action: 'compile',
      job: data.job,
      compiledCode: compiledCode,
      error: compilationError ? serializeError(compilationError) : undefined
    });
  }
});
