'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapUI]' );

var BootstrapUI = module.exports = function BootstrapUI( context ){
    debug( '#execute' );
    context.wireView( 'ErrorView', require( '../views/ErrorView' ), {
        collection : "errorsCollection"
    } );
    context.wireView( 'MenuView', require( '../views/MenuView' ), {
        model : 'authService'
    } );
    context.wireView( 'AccountView', require( '../views/AccountView' ), {
        model : "accountModel"
    } );
    context.wireView( 'AssessmentView', require( '../views/factories/AssessmentViewFactory' ), {
        context : 'appContext'
    } );
    context.wireView( 'LoginView', require( '../views/LoginView' ) );
    context.wireView( 'AppView', require( '../views/AppView' ) );
    context.wireView( 'WelcomeView', require( '../views/WelcomeView' ) );
    context.wireView( 'NotFoundView', require( '../views/404View' ) );
    context.wireView( 'LoadingView', require( '../views/LoadingView' ) );

    var appView = context.getObject( 'AppView' )();
    appView.render();

    var MinsizeWarning = require( '../views/MinsizeWarning' );
    var warning = new MinsizeWarning();
    warning.render();
};

