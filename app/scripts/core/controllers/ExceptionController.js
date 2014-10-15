'use strict';
var debug = require( 'debug' )( 'dpac:core', '[ExceptionController]' );

module.exports = Marionette.Controller.extend( {
    wiring        : ['errorsCollection'],
    contextEvents : {
        'backbone:sync:error' : "errorEventHandler"
    },
    initialize    : function(){
        debug.log( '#initialize' );

        var errorsCollection = this.errorsCollection;
        window.onerror = function(message, file, line, col, err){
            errorsCollection.add({
                err : err
            });
        };
    },

    errorEventHandler : function(attrs){
        debug('#errorOccurred');
        this.errorsCollection.add(attrs);
    }
} );
