'use strict';
var _ = require( 'underscore' );
var debug = require( 'debug' )( 'dpac:core.controllers', '[SetupUserAccountSyncing]' );

module.exports = function SetupUserAccountSyncing(){
};

_.extend( module.exports.prototype, {
    wiring: [ 'authenticationService', 'accountModel' ],
    execute: function(){
        debug( '#execute' );
        var account = this.accountModel;
        this.authenticationService.on( 'change:user', function(service){
            account.set(service.get('user'));
        } );
    }
} );

