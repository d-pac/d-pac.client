'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapDomain]' );

var BootstrapModels = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapModels.prototype, {
    wiring : ['config'],

    execute : function(){
        debug( '#execute' );
        var context = this.context;

        context.wireSingleton( 'accountModel', require( '../models/UserModel' ));

        context.wireSingleton( 'authService', require( '../services/AuthService' ) );

        context.wireCommands( {
            'route:signout:completed' : require( './Signout' )
        } );

    }
} );
