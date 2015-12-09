'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:results.controllers', '[LoadRepresentations]' );

var LoadRepresentations = module.exports = function LoadRepresentations( context ){
};

_.extend( LoadRepresentations.prototype, {

    execute: function(){
        debug( '#execute' );

        var context = this.context;
        context.getObject( 'representationsCollection' ).fetchForAssessment( this.eventData.assessment );

        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
