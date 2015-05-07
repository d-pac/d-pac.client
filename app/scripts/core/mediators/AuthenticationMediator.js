'use strict';
var debug = require( 'debug' )( 'dpac:core', '[ResponseMediator]' );
var i18n = require( 'i18next' );

var Marionette = require( 'backbone.marionette' );
module.exports = Marionette.Controller.extend( {
    contextEvents: {
        'authentication:signin:completed': "signinHandler",
        'authentication:signout:completed': "signoutHandler",
        'router:route:completed': "routeHandler"
    },
    initialize: function(){
        debug.log( '#initialize' );
    },

    signinHandler: function( auth ){
        if( auth.authenticated ){
            //this.dispatch( 'router:route:requested', {
            //    route: "welcome"
            //} );
            this.dispatch( 'app:show:messages', {
                type: i18n.t("login:signedin.type") || "success",
                title: i18n.t("login:signedin.title"),
                message: i18n.t("login:signedin.message")
            } );
        }
    },

    signoutHandler: function(){
        this.dispatch( 'router:route:requested', {
            route: "signin"
        } );
        this.dispatch( 'app:show:messages', {
            type: i18n.t("login:signedout.type") || "info",
            title: i18n.t("login:signedout.title"),
            message: i18n.t("login:signedout.message")
        } );
    },

    routeHandler: function( data ){
        if( data.route === "signout" ){
            this.dispatch( 'authentication:signout:requested' );
        }
    }
} );
