'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapUI]' );
var _ = require('underscore');

module.exports = function BootstrapUI(  ){};
_.extend( module.exports.prototype, {
    wiring : ['assessmentMediator'],
    execute: function(){
        debug( '#execute' );
        var assessmentMediator = this.assessmentMediator;
        var context = this.context;
        context.wireView( 'MessagesView', require( '../views/MessagesView' ) );
        context.wireView( 'MenuView', require( '../views/MenuView' ), {
            model: 'authService',
            config: 'config',
            pendingRequests: 'pendingRequests'
        } );

        //context.wireView( 'AccountView', require( '../views/AccountView' ), {
        //    model : "accountModel"
        //} );

        context.wireView( 'SigninView', require( '../views/SigninView' ), {
            model: "authService"
        } );

        context.wireView( 'AppView', require( '../views/AppView' ), {
            menuFactory: "MenuView",
            messagesViewFactory: "MessagesView",
            signinFactory: "SigninView",
            welcomeFactory: "WelcomeView",
            notfoundFactory: "NotFoundView",
            tutorialFactory: "TutorialView",
            assessFactory: "assessmentViewProxy"
        } );
        context.wireView( 'WelcomeView', require( '../views/WelcomeView' ), {
            collection: 'pagesCollection'
        } );
        context.wireView( 'NotFoundView', require( '../views/404View' ) );
        context.wireView( 'TutorialView', require( '../views/TutorialView' ) );

        var appView = context.getObject( 'AppView' )();
        appView.render();

        var MinsizeWarning = require( '../views/MinsizeWarning' );
        var warning = new MinsizeWarning();
        warning.render();
    }
});

