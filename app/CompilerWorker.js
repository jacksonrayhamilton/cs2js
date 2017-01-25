/* eslint-env worker */

'use strict';

var CoffeeScript = require('coffee-script');

function compile (code) {
  return CoffeeScript.compile(code, {bare: true});
}

addEventListener('message', function (messageEvent) {
  var data = messageEvent.data;
  if (data.action === 'compile') {
    postMessage({
      action: 'compile',
      job: data.job,
      compiledCode: compile(data.codeToCompile)
    });
  }
});
