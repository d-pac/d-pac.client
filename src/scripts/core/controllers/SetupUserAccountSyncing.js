'use strict';
const {extend} = require( 'lodash' );
var debug = require( 'debug' )( 'dpac:core.controllers', '[SetupUserAccountSyncing]' );

module.exports = function SetupUserAccountSyncing(){
    //constructor
};

extend( module.exports.prototype, {
    wiring: [ 'authenticationService', 'accountModel' ],
    execute: function(){
        debug( '#execute' );
        var account = this.accountModel;
        this.authenticationService.on( 'change:user', function(service){
            account.set(service.get('user'));
        } );
    }
} );

