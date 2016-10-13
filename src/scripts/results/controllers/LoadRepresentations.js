'use strict';

const {extend} = require( 'lodash' );

const debug = require( 'debug' )( 'dpac:results.controllers', '[LoadRepresentations]' );

const LoadRepresentations = module.exports = function LoadRepresentations( context ){
    // constructor
};

extend( LoadRepresentations.prototype, {
    wiring: ['representationsRankingsController'],
    execute: function(){
        debug( '#execute' );

        this.representationsRankingsController.fetchForAssessment( this.eventData.assessment );
    }
} );
