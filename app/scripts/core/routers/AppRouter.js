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
                var dest = "#signin?from="+ route;
                route = "signin";
                debug("redirect", dest);
                this.navigate(dest);
            }
            this.dispatch( "app:view:requested", {
                view: route
            } );
        }.bind( this ) );
    }
} );
