'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:uploads.controllers', '[LoadRepresentations]' );

var LoadRepresentations = module.exports = function LoadRepresentations( context ){
};

_.extend( LoadRepresentations.prototype, {
    wiring: ['representationsCollection'],
    execute: function(){
        debug( '#execute' );

        this.representationsCollection.fetchForUser();
    }
} );
