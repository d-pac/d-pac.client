'use strict';

const {extend} = require( 'lodash' );

// var debug = require( 'debug' )( 'dpac:assess.controllers', '[LoadPhases]' );

var LoadPhases = module.exports = function LoadPhases(){
    //constructor
};
extend( LoadPhases.prototype, {
    wiring: [ 'phasesCollection' ],

    execute: function(){
        this.phasesCollection.once( "sync", ()=>{
            this.dispatch( "phases:collection:sync" );
        } );
        this.phasesCollection.fetch();
    }
} );


