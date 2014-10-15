'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapDomain]' );

var BootstrapModels = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapModels.prototype, {
    wiring : ['config'],

    execute : function(){
        debug( '#execute' );
        var context = this.context;

        //moved to App, since we need it ASAP
        //context.wireSingleton( 'errorsCollection', require( '../collections/ErrorsCollection' ) );
        //context.configure('errorsCollection', undefined, this.config.errorlogs);

        context.wireSingleton( 'exceptionController', require('../controllers/ExceptionController'));
        context.getObject('exceptionController');

        context.wireSingleton( 'accountModel', require( '../models/AccountProxy' ));

        context.wireSingleton( 'authService', require( '../services/AuthService' ) );

        context.wireCommands( {
            'route:signout:completed' : require( './Signout' )
        } );

    }
} );
