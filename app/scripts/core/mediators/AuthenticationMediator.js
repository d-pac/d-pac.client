'use strict';
var debug = require( 'debug' )( 'dpac:core', '[ResponseMediator]' );
var Marionette = require('backbone.marionette');
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
                type: "success",
                title: "Ingelogd",
                message: "U bent ingelogd"
            } );
        }
    },

    signoutHandler : function(){
        this.dispatch( 'router:route:requested', {
            route: "signin"
        } );
        this.dispatch( 'app:show:messages', {
            type: "success",
            title: "Uitgelogd",
            message: "U bent uitgelogd."
        } );
    },

    routeHandler : function(data){
        if(data.route === "signout"){
            this.dispatch('authentication:signout:requested');
        }
    }
} );
