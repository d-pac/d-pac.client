'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapUI]' );
var _ = require( 'underscore' );

module.exports = function BootstrapUI(){
};
_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var context = this.context;
        context.wireView( 'MessagesView', require( '../views/MessagesView' ) );
        context.wireView( 'MenuView', require( '../views/MenuView' ), {
            model: 'authService',
            config: 'config',
            pendingRequests: 'pendingRequests'
        } );

        context.wireView( 'AccountView', require( '../views/AccountView' ), {
            model: "accountModel"
        } );

        context.wireView( 'SigninView', require( '../views/SigninView' ), {
            model: "authService",
            config: 'config',
        } );

        context.wireView( 'AppView', require( '../views/AppView' ), {
            menuFactory: "MenuView",
            messagesViewFactory: "MessagesView",
            signinFactory: "SigninView",
            welcomeFactory: "WelcomeView",
            notfoundFactory: "NotFoundView",
            tutorialFactory: "TutorialView",
            assessFactory: "assessmentViewProxy",
            accountFactory: "AccountView",
            resultsFactory: "resultsViewProxy"
        } );
        context.wireView( 'WelcomeView', require( '../views/WelcomeView' ), {
            collection: 'pagesCollection',
            auth: 'authService',
            config: 'config',
        } );
        context.wireView( 'NotFoundView', require( '../views/404View' ) );
        context.wireView( 'TutorialView', require( '../views/TutorialView' ) );

        context.wireSingleton( 'mediaViewFactory', require( '../../common/views/MediaViewFactory' ) );

        var appView = context.getObject( 'AppView' )();
        appView.render();
    }
} );

