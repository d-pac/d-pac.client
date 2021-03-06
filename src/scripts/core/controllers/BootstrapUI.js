'use strict';
const debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapUI]' );
const {extend} = require( 'lodash' );

module.exports = function BootstrapUI(){
    //constructor
};
extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        const context = this.context;
        context.wireView( 'MessagesView', require( '../views/MessagesView' ) );
        context.wireView( 'MenuView', require( '../views/MenuView' ), {
            model: 'authenticationService',
            config: 'config',
            pendingRequests: 'pendingRequests',
            permissions: 'authorizationModel'
        } );

        context.wireView( 'AccountView', require( '../views/AccountView' ), {
            model: "accountModel"
        } );

        context.wireView( 'SigninView', require( '../views/SigninView' ), {
            model: "authenticationService",
            permissions: 'authorizationModel'
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
            resultsFactory: "resultsViewProxy",
            uploadsFactory: "uploadsViewProxy"
        } );
        context.wireView( 'WelcomeView', require( '../views/WelcomeView' ), {
            collection: 'pagesCollection',
            auth: 'authenticationService',
            config: 'config',
            permissions: 'authorizationModel'
        } );
        context.wireView( 'NotFoundView', require( '../views/404View' ) );
        context.wireView( 'TutorialView', require( '../views/TutorialView' ) );

        context.wireSingleton( 'mediaViewFactory', require( '../../common/views/MediaViewFactory' ), {
            permissions: 'authorizationModel'
        } );

        const appView = context.getObject( 'AppView' )();
        appView.render();
    }
} );

