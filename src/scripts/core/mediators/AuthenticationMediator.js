'use strict';
const debug = require( 'debug' )( 'dpac:core', '[AuthMediator]' );
const i18n = require( 'i18next' );

const {Controller} = require( 'backbone.marionette' );
module.exports = Controller.extend( {
    contextEvents: {
        'authentication:signout:completed': "signoutHandler",
        'router:route:completed': "routeHandler"
    },
    initialize: function(){
        debug( '#initialize' );
        this.setupEventsRelay();
        this.listenTo( this, 'authentication:state:authenticated', this.showLoginMessage.bind( this ) );
    },

    setupEventsRelay: function(){
        this.authenticationService.on( 'change:authenticated', function( model ){
            const state = (model.get( 'authenticated' ))
                ? "authenticated"
                : "unauthenticated";
            this.dispatch( 'authentication:state:' + state );
        }, this );
    },

    //loadResources: function(){
    //    const collection = this.assessmentsCollection;
    //    collection.once( "sync", function(){
    //        this.dispatch( "assessments:collection:sync" );
    //    }, this );
    //    collection.fetch();
    //},

    showLoginMessage: function(){
        this.dispatch( 'app:show:messages', {
            type: i18n.t( "login:signedin.type" ) || "success",
            title: i18n.t( "login:signedin.title" ),
            message: i18n.t( "login:signedin.message" )
        } );
    },

    //statusHandler: function( auth ){
    //    debug( '#statusHandler', auth );
    //    if( auth.authenticated ){
    //        this.loadResources();
    //    }
    //},

    //signinHandler: function( auth ){
    //    debug( '#signinHandler', auth );
    //    if( auth.authenticated ){
    //        this.showLoginMessage();
    //        this.loadResources();
    //    }
    //},

    signoutHandler: function(){
        this.dispatch( 'router:route:requested', {
            route: "signin"
        } );
        this.dispatch( 'app:show:messages', {
            type: i18n.t( "login:signedout.type" ) || "info",
            title: i18n.t( "login:signedout.title" ),
            message: i18n.t( "login:signedout.message" )
        } );
    },

    routeHandler: function( data ){
        if( data.route === "signout" ){
            this.dispatch( 'authentication:signout:requested' );
        }
    }
} );
