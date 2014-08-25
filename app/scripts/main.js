'use strict';

var debug = require('bows')('dpac:app');
debug('Main | starting up...');

var app = require( './App.js' );
app.start();
