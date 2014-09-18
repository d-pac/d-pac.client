'use strict';

var debug = require( 'debug' );

module.exports = function SetupDebugging(){
    debug.config( {
        padLength : 20
    } );
};
