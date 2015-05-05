'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapUI]' );

var BootstrapUI = module.exports = function BootstrapUI( context ){
    debug( '#execute' );
    context.wireView( 'MessagesView', require( '../views/MessagesView' ) );
    context.wireView( 'MenuView', require( '../views/MenuView' ), {
        model: 'authService',
        config: 'config',
        pendingRequests: 'pendingRequests'
    } );

    //context.wireView( 'AccountView', require( '../views/AccountView' ), {
    //    model : "accountModel"
    //} );
    context.wireView( 'AssessmentView', require( '../views/factories/AssessmentViewFactory' ), {
        context: 'appContext'
    } );
    context.wireView( 'LoginView', require( '../views/LoginView' ) );
    context.wireView( 'AppView', require( '../views/AppView' ), {
        menuFactory: "MenuView",
        messagesViewFactory: "MessagesView",
        signinFactory: "LoginView",
        welcomeFactory: "WelcomeView",
        notfoundFactory: "NotFoundView"
    } );
    context.wireView( 'WelcomeView', require( '../views/WelcomeView' ), {
        collection: 'pagesCollection'
    } );
    context.wireView( 'NotFoundView', require( '../views/404View' ) );
    context.wireView( 'RecoverView', require( '../views/RecoverView' ) );
    context.wireView( 'TutorialView', require( '../views/TutorialView' ) );

    var appView = context.getObject( 'AppView' )();
    appView.render();

    var MinsizeWarning = require( '../views/MinsizeWarning' );
    var warning = new MinsizeWarning();
    warning.render();

    context.dispatch( "app:show:messages", [
        {
            type: "success",
            title: "bootstrap completed",
            message: "YEAH!"
        }, {
            type: "info",
            title: "Welcome",
            message: "Very nice."
        }
    ] );
};

