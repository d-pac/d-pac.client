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

        context.wireSingleton( 'authenticationMediator', require( '../mediators/AuthenticationMediator' ) );
        context.getObject( 'authenticationMediator' );

        context.wireSingleton( 'assessmentMediator', require( '../mediators/AssessmentMediator' ), {
            model: "authService",
            context: "appContext"
        } );
        context.getObject( 'assessmentMediator' );
    }
} );



