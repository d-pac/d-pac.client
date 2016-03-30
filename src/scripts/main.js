'use strict';

/* stand-alones */
require( 'babel-polyfill' );
require( 'modernizr' );
require( 'bootstrap' );
require( '../styles/main.less' );
require( 'lity' );
/* --- */

require( './core/controllers/SetupDebugging' )();

var debug = require( 'debug' )( 'dpac:app' );
debug( '*** starting up ***' );

var app = require( './core/App.js' );
app.start();
