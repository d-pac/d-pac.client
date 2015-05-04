'use strict';

var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapMetaDomain]' );
module.exports = function BootstrapMetaDomain(){
};

_.extend( module.exports.prototype, {
    wiring : ['config'],
    execute: function(){
        debug( '#execute' );
        this.context.wireSingleton( 'errorsCollection', require( '../collections/ErrorsCollection' ) );
        this.context.configure('errorsCollection', undefined, this.config.errorlogs);

        this.context.wireSingleton( 'pendingRequests', require( '../collections/PendingRequestsCollection' ) );
        this.context.getObject( 'pendingRequests' );
    }
} );


