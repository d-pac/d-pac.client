'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:uploads.controllers', '[LoadRepresentations]' );

var LoadRepresentations = module.exports = function LoadRepresentations( context ){
    //constructor
};

_.extend( LoadRepresentations.prototype, {
    wiring: ['representationsCollection'],
    execute: function(){
        debug( '#execute' );

        this.representationsCollection.once( "sync", function(){
            this.dispatch( "representations:collection:sync" );
        }.bind( this ) );
        this.representationsCollection.fetchForUser();
    }
} );
