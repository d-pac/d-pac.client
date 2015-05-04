'use strict';

var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapDomain]' );
module.exports = function BootstrapDomain(){
};

_.extend( module.exports.prototype, {
    wiring : ['config'],
    execute: function(){
        debug( '#execute' );
        var context = this.context;

        context.wireSingleton( 'errorsCollection', require( '../collections/ErrorsCollection' ) );
        context.configure('errorsCollection', undefined, this.config.errorlogs);

        context.wireSingleton( 'pendingRequests', require( '../collections/PendingRequestsCollection' ) );
        context.getObject( 'pendingRequests' );

        context.wireSingleton( 'exceptionController', require( '../controllers/ExceptionController' ) );
        context.getObject( 'exceptionController' );

        context.wireSingleton( 'authService', require( '../services/AuthService' ) );
        context.getObject( 'authService' );

        context.wireSingleton('pagesCollection', require('../collections/PagesCollection'));
        context.getObject( 'pagesCollection' );

    }
} );


