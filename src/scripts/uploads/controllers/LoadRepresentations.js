'use strict';

const {extend} = require( 'lodash' );

const debug = require( 'debug' )( 'dpac:uploads.controllers', '[LoadRepresentations]' );

const LoadRepresentations = module.exports = function LoadRepresentations( context ){
    //constructor
};

extend( LoadRepresentations.prototype, {
    wiring: ['representationsCollection'],
    execute: function(){
        debug( '#execute' );

        this.representationsCollection.once( "sync", ()=>{
            this.dispatch( "representations:collection:sync" );
        });
        this.representationsCollection.fetchForUser();
    }
} );
