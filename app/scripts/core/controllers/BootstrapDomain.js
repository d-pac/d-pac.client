'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapDomain]' );
module.exports = function BootstrapDomain(){
};

_.extend( module.exports.prototype, {
    wiring: [ 'config' ],
    execute: function(){
        debug( '#execute' );
        var context = this.context;

        context.wireSingleton( 'pendingRequests', require( '../collections/PendingRequestsCollection' ) );
        context.getObject( 'pendingRequests' );

        context.wireSingleton( 'authService', require( '../services/AuthService' ) );
        context.getObject( 'authService' );

        context.wireSingleton( 'pagesCollection', require( '../collections/PagesCollection' ) );
        context.wireSingleton( 'accountModel', require( '../models/AccountProxy' ) );

    }
} );


