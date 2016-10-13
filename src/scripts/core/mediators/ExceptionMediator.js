'use strict';
const { each, defaults, kebabCase, isNumber } = require( 'lodash' );
const { Controller } = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:core', '[ExceptionMediator]' );
const i18n = require( 'i18next' );

module.exports = Controller.extend( {
    contextEvents: {
        'backbone:sync:error': "errorEventHandler"
    },
    initialize: function(){
        debug( '#initialize' );

        window.onerror = ( message,
                           file,
                           line,
                           col,
                           err )=>{
            console.log( "ERROR occurred:", message, file, line, col, err );
            const ref = (err && err.message)
                ? err.message
                : message || "unknown-error";
            this.errorEventHandler( {
                errors: [
                    {
                        message: "Unknown Error",
                        explanation: "Unknown Error",
                        ref: ref,
                        fatal: true
                    }
                ],
                url: window.location.href,
            } );
        };
    },

    errorEventHandler: function( errObj ){
        const messages = [];
        each( errObj.errors, function( err ){
            const merged = defaults( {
                ref: err.code || err.ref,
            }, errObj ); //allows access to request-uuid, url, code etc.
            console.log( merged );
            const message = err.message || "unknown error";
            const explanation = err.explanation || message;
            messages.push( {
                type: "error",
                title: i18n.t( [ "errors:" + kebabCase( message ), "errors:unknown-error" ], merged ),
                message: i18n.t( [ "errors:" + kebabCase( explanation ), "errors:unknown-error" ], merged ),
                permanent: err.fatal || ( isNumber( Number( err.code ) ) && err.code >= 500) || false
            } );
        }, this );
        this.dispatch( 'app:show:messages', messages );
    }
} );
