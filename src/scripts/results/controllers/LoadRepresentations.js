'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:results.controllers', '[LoadRepresentations]' );

var LoadRepresentations = module.exports = function LoadRepresentations( context ){
    // constructor
};

_.extend( LoadRepresentations.prototype, {
    wiring: ['representationsRankingsController'],
    execute: function(){
        debug( '#execute' );

        this.representationsRankingsController.fetchForAssessment( this.eventData.assessment );
    }
} );
