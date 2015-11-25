'use strict';
var _ = require( 'underscore' );
var Marionette = require('backbone.marionette');
var S = require('string');
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
            var title = err.message || "";
            var message = err.explanation || title;
            var merged = _.defaults(err, errObj);
            title = i18n.t( ["errors:" + S( title ).slugify().s, "errors:unknown-error"], merged );
            if( message ){
                message = i18n.t( ["errors:" + S( message ).slugify().s, "errors:unknown-error"], merged );
            }

            messages.push( {
                type: "error",
                title: title,
                message: message,
                permanent: err.fatal || false
            } );
        }, this );
        this.dispatch( 'app:show:messages', messages );
    }
} );
