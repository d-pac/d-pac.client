'use strict';

const {extend} = require( 'lodash' );
const debug = require( 'debug' )( 'dpac:results.controllers', '[LoadResults]' );

const LoadAssessment = module.exports = function LoadAssessment( context ){
    // constructor
};

extend( LoadAssessment.prototype, {
    wiring: ['resultsVM'],
    execute: function(){
        debug( '#execute' );
        this.resultsVM.fetchResultsForAssessment(this.eventData.assessment)
    }
} );
