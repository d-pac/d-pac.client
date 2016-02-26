'use strict';
var debug = require( 'debug' )( 'dpac:core', '[AuthMediator]' );
var i18n = require( 'i18next' );

var Marionette = require( 'backbone.marionette' );
module.exports = Marionette.Controller.extend( {
    contextEvents: {
        'authentication:signout:completed': "signoutHandler",
        'router:route:completed': "routeHandler"
    },
    initialize: function(){
        debug.log( '#initialize' );
        this.setupEventsRelay();
        this.listenTo( this, 'authentication:state:authenticated', this.showLoginMessage.bind( this ) );
    },

    setupEventsRelay: function(){
        this.authenticationService.on( 'change:authenticated', function( model ){
            var state = (model.get('authenticated'))
                ? "authenticated"
                : "unauthenticated";
            this.dispatch( 'authentication:state:' + state );
        }.bind( this ) )
    },

    //loadResources: function(){
    //    var collection = this.assessmentsCollection;
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
