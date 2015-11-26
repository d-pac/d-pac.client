'use strict';
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var S = require( 'string' );
var debug = require( 'debug' )( 'dpac:core', '[ExceptionMediator]' );
var i18n = require( 'i18next' );

module.exports = Marionette.Controller.extend( {
    contextEvents: {
        'backbone:sync:error': "errorEventHandler"
    },
    initialize: function(){
        debug.log( '#initialize' );

        window.onerror = function( message,
                                   file,
                                   line,
                                   col,
                                   err ){
            console.log( "ERROR occurred:", err );
            this.errorEventHandler( {
                errors: [
                    {
                        message: "Unknown Error",
                        explanation: "Please contact",
                        fatal: true
                    }
                ]
            } );
        }.bind( this );
    },

    errorEventHandler: function( errObj ){
        var messages = [];
        _.each( errObj.errors, function( err ){
            var merged = _.defaults( {}, err, errObj ); //allows access to request-uuid, url, code etc.
            var message = err.message || "unknown error";
            var explanation = err.explanation || message;
            messages.push( {
                type: "error",
                title: i18n.t("errors:" + S( message ).slugify().s, merged),
                message: i18n.t("errors:" + S( explanation ).slugify().s, merged),
                permanent: err.fatal || false
            } );
        }, this );
        this.dispatch( 'app:show:messages', messages );
    }
} );
