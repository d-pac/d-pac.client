'use strict';
var debug = require( 'debug' )( 'dpac:core', '[ExceptionMediator]' );

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
                        explanation: "Please contact"
                    }
                ]
            } );
        }.bind( this );
    },

    errorEventHandler: function( errObj ){
        var messages = [];
        _.each( errObj.errors, function( err ){
            var title = err.message || "";
            title = i18n.t( [ "errors:" + S( title ).slugify().s, title ] );
            var message = err.explanation || "";
            if( message ){
                message = i18n.t( [ "errors:" + S( message ).slugify().s, message ] )
            }
            messages.push( {
                type: "error",
                title: title,
                message: message
            } );
        }, this );
        this.dispatch( 'app:show:messages', messages );
    }
} );
