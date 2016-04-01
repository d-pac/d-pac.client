'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:results.controllers', '[BootstrapDomain]' );

var BootstrapDomain = module.exports = function BootstrapDomain( context ){
};

_.extend( BootstrapDomain.prototype, {

    execute: function(){
        debug( '#execute' );

        var context = this.context;
        context.wireSingleton( 'representationsCollection', require( '../../common/models/RepresentationsCollection' ) );
        context.wireSingleton( 'feedbackCollection', require( '../../common/models/FeedbackCollection' ) );

        this.context = undefined;
        this.eventName = undefined;
        this.eventData = undefined;
    }
} );
