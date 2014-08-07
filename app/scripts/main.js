'use strict';
var log = require('bows')('dpac:main');
log('starting up...');

var App = require( './app/App.js' );
var app = new App();
