'use strict';
var _ = require( 'lodash' );
var Marionette = require( 'backbone.marionette' );
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
                        explanation: "Unknown Error",
                        ref: err.message,
                        fatal: true
                    }
                ],
                url: window.location.href,
            } );
        }.bind( this );
    },

    errorEventHandler: function( errObj ){
        var messages = [];
        _.each( errObj.errors, function( err ){
            var merged = _.defaults( {
                ref: err.code || err.ref
            }, errObj ); //allows access to request-uuid, url, code etc.
            console.log(merged);
            var message = err.message || "unknown error";
            var explanation = err.explanation || message;
            messages.push( {
                type: "error",
                title: i18n.t("errors:" + _.kebabCase(message), merged),
                message: i18n.t("errors:" + _.kebabCase(explanation), merged),
                permanent: err.fatal || false
            } );
        }, this );
        this.dispatch( 'app:show:messages', messages );
    }
} );
