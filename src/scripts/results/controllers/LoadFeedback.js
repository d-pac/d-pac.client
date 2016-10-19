'use strict';

const {extend} = require( 'lodash' );
const debug = require( 'debug' )( 'dpac:results.controllers', '[LoadFeedback]' );

const LoadFeedback = module.exports = function LoadFeedback( context ){
    // constructor
};

extend( LoadFeedback.prototype, {
    execute: function(){
        debug( '#execute' );

        const context = this.context;
        context.getObject( 'feedbackCollection' ).fetchForRepresentation( this.eventData.representation );

        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
