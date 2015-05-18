'use strict';

/* stand-alones */
require('modernizr');
require('bootstrap');
require('bootstrap-material-design' ).init();
require('bootstrap-validator');
/* --- */

require('./core/controllers/SetupDebugging')();

var debug = require('debug')( 'dpac:app' );
debug( '*** starting up ***' );

var app = require( './core/App.js' );
app.start();
