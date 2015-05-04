'use strict';
var debug = require( 'debug' )( 'dpac:core.routers', '[AppRouter]' );

module.exports = Backbone.Router.extend( {
    routes: {
        "welcome": "welcome",
        "tutorial": "tutorial",
        "signin": "signin",
        "assess": "assess",
        "account": "account",
        "": "welcome",
        "*notfound": "notfound"
    },

    secured: [ "assess", "account" ],

    initialize: function(){
        debug( '#initialize' );
        this.on( 'route', function( route ){
            debug('handle route', route);
            if( this.secured.indexOf( route ) >= 0 && !this.model.get("authenticated") ){
                route = "#signin?from="+ route;
                debug("redirect", route);
                this.navigate(route);
            }
            this.dispatch( "app:view:requested", {
                view: route
            } );
        }.bind( this ) );
    }
} );
