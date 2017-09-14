'use strict';

const {extend} = require( 'lodash' );
const debug = require( 'debug' )( 'dpac:results.controllers', '[LoadStats]' );

const LoadAssessment = module.exports = function LoadAssessment( context ){
    // constructor
};

extend( LoadAssessment.prototype, {
    wiring: ['statsController'],
    execute: function(){
        debug( '#execute' );

        // this.eventData.assessment.fetch();

        this.statsController.fetchForAssessment(this.eventData.assessment)
    }
} );
