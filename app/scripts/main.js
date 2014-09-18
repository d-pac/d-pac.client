'use strict';

require('./controllers/SetupDebugging')();
var debug = require('debug')( 'dpac:app' );
debug( '*** starting up ***' );

var app = require( './App.js' );
app.start();
