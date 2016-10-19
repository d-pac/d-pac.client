'use strict';
const {extend} = require( 'lodash' );

const debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapMediators]' );
module.exports = function BootstrapMediators(){
    //constructor
};

extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        const context = this.context;

        context.wireSingleton( 'exceptionMediator', require( '../mediators/ExceptionMediator' ) );
        context.getObject( 'exceptionMediator' );

        context.wireSingleton( 'authenticationMediator', require( '../mediators/AuthenticationMediator' ), {
            authenticationService: "authenticationService"
        } );
        context.getObject( 'authenticationMediator' );

        context.wireSingleton( 'assessModuleMediator', require( '../../common/mediators/AssessModuleMediator' ), {
            model: "authenticationService",
            context: "appContext"
        } );
        context.getObject( 'assessModuleMediator' );
        context.wireSingleton( 'resultsModuleMediator', require( '../../common/mediators/ResultsModuleMediator' ), {
            model: "authenticationService",
            context: "appContext"
        } );
        context.getObject( 'resultsModuleMediator' );
        context.wireSingleton( 'uploadsModuleMediator', require( '../../common/mediators/UploadsModuleMediator' ), {
            model: "authenticationService",
            context: "appContext"
        } );
        context.getObject( 'uploadsModuleMediator' );
    }
} );



