'use strict';
var _ = require( 'lodash' );
var debug = require( 'debug' )( 'dpac:core.routers', '[AppRouter]' );
var Backbone = require( 'backbone' );

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
            var permissions = this.permissions.toJSON();
            if( this.secured.indexOf( route ) >= 0 && !_.get( permissions, [ 'allowed', route, 'view' ], false ) ){
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
        this.navigate( data.route, { trigger: true } );
    }
} );
