'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var r = React.createElement;

var App = require('./App');

ReactDOM.render(
  r(App),
  document.querySelector('.cs2js-AppContainer')
);
