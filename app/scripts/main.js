'use strict';

/* stand-alones */
require('modernizr');
require('bootstrap');
require('bootstrap-material-design/ripples');
require('imports?jQuery=jquery!exports?jQuery.material!bootstrap-material-design/material' ).init();
require('bootstrap-validator');
/* --- */

require('./core/controllers/SetupDebugging')();


var debug = require('debug')( 'dpac:app' );
debug( '*** starting up ***' );

var app = require( './core/App.js' );
app.start();
