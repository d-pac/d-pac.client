'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapMediators]' );
module.exports = function BootstrapMediators(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var context = this.context;

        context.wireSingleton( 'exceptionMediator', require( '../mediators/ExceptionMediator' ) );
        context.getObject( 'exceptionMediator' );

        context.wireSingleton( 'authenticationMediator', require( '../mediators/AuthenticationMediator' ), {
            authService: "authService"
        } );
        context.getObject( 'authenticationMediator' );

        context.wireSingleton( 'assessModuleMediator', require( '../../common/mediators/AssessModuleMediator' ), {
            model: "authService",
            context: "appContext"
        } );
        context.getObject( 'assessModuleMediator' );
        context.wireSingleton( 'resultsModuleMediator', require( '../../common/mediators/ResultsModuleMediator' ), {
            model: "authService",
            context: "appContext"
        } );
        context.getObject( 'resultsModuleMediator' );
    }
} );



