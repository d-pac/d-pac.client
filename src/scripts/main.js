'use strict';

/* stand-alones */
require('../styles/main.less');
require('modernizr');
require('bootstrap');
require('bootstrap-material-design' ).init();
require('lity');
/* --- */

require('./core/controllers/SetupDebugging')();

var debug = require('debug')( 'dpac:app' );
debug( '*** starting up ***' );

var app = require( './core/App.js' );
app.start();
