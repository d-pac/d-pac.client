'use strict';

var _ = require( 'underscore' );

// var debug = require( 'debug' )( 'dpac:assess.controllers', '[LoadPhases]' );

var LoadPhases = module.exports = function LoadPhases(){
    //constructor
};
_.extend( LoadPhases.prototype, {
    wiring: [ 'phasesCollection' ],

    execute: function(){
        this.phasesCollection.once( "sync", function(){
            this.dispatch( "phases:collection:sync" );
        }.bind( this ) );
        this.phasesCollection.fetch();
    }
} );


