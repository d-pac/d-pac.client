'use strict';

var _ = require( 'lodash' );
var debug = require( 'debug' )( 'dpac:results.controllers', '[LoadFeedback]' );

var LoadFeedback = module.exports = function LoadFeedback( context ){
    // constructor
};

_.extend( LoadFeedback.prototype, {
    execute: function(){
        debug( '#execute' );

        var context = this.context;
        context.getObject( 'feedbackCollection' ).fetchForRepresentation( this.eventData.representation );

        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
