'use strict';
var sauceConnectLauncher = require( 'sauce-connect-launcher' );

const konfy = require( 'konfy' );
konfy.load( function(){
    console.log('Connecting to sauce connect');
    sauceConnectLauncher( {
    }, function( err,
                 sauceConnectProcess ){
        if( err ){
            console.error( "ERROR connecting to Sauce Connect:", err.message );
            return;
        }
        require( 'nightwatch/bin/runner.js' );

        sauceConnectProcess.close( function(){
            console.log( "Closed Sauce Connect process" );
        } );
    } );
} );

