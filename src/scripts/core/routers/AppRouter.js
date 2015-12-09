'use strict';
var debug = require( 'debug' )( 'dpac:core.routers', '[AppRouter]' );
var Backbone = require('backbone');

module.exports = Backbone.Router.extend( {
    routes: {
        "welcome": "welcome",
        "tutorial": "tutorial",
        "signin": "signin",
        "signout": "signout",
        "assess": "assess",
        "account": "account",
        "results": "results",
        "": "welcome",
        "*notfound": "notfound"
    },

    contextEvents: {
        "router:route:requested": "navigateToRoute"
    },

    secured: [ "assess", "account", "results" ],

    initialize: function(){
        debug( '#initialize' );
        this.on( 'route', function( route ){
            debug( 'handle route', route );
            if( this.secured.indexOf( route ) >= 0 && !this.model.get( "authenticated" ) ){
                var dest = "#signin?from=" + route;
                route = "signin";
                debug( "redirect", dest );
                this.navigate( dest );
            }
            this.dispatch( "router:route:completed", {
                route: route
            } );
        }.bind( this ) );
    },

    navigateToRoute: function( data ){
        this.navigate( data.route, {trigger:true} );
    }
} );
