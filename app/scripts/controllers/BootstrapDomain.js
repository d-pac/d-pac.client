'use strict';
var debug = require( 'bows' )( 'dpac:commands' );
var UserModel = require( '../models/UserModel' );
var AuthService = require( '../services/AuthService' );

var BootstrapModels = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapModels.prototype, {
    execute : function(){
        debug.log( 'BootstrapDomain#execute' );
        this.context.wireValue( 'currentUser', new UserModel( { id : 'me' } ) );
        this.context.wireSingleton( 'authService', AuthService );
        this.context.wireCommands( {
            'route:signout:completed' : require( './Signout' )
        } );
    }
} );
