'use strict';

require('./core/controllers/SetupDebugging')();

var debug = require('debug')( 'dpac:app' );
debug( '*** starting up ***' );

var app = require( './core/App.js' );
app.start();
