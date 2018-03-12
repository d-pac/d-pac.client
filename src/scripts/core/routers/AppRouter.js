'use strict';
const {get} = require( 'lodash' );
const debug = require( 'debug' )( 'dpac:core.routers', '[AppRouter]' );
const {Router} = require( 'backbone' );

module.exports = Router.extend( {
    permissions: undefined,

    routes: {
        "welcome": "welcome",
        "tutorial": "tutorial",
        "signin": "signin",
        "signout": "signout",
        "assess": "assess",
        "comparison": "comparison",
        "account": "account",
        "results": "results",
        "uploads": "uploads",
        "": "welcome",
        "*notfound": "notfound"
    },

    contextEvents: {
        "router:route:requested": "navigateToRoute",
        "router:url:requested": "navigateToUrl"
    },

    secured: [ "assess", "account", "results", "uploads" ],
    redirect: {
        comparison: "assess"
    },

    initialize: function(){
        debug( '#initialize' );
        this.on( 'route', function( route ){
            debug( 'handle route', route );
            ga('set', 'page', '/tool/'+route);
            ga('send', 'pageview');

            if(Object.keys(this.redirect).indexOf(route)>-1){
                return this.navigateToRoute({
                    route: this.redirect[route]
                });
            }
            // const permissions = this.permissions.toJSON();
            // if( this.secured.indexOf( route ) >= 0 && !get( permissions, [ 'allowed', route, 'view' ], false ) ){
            //     const dest = "#signin?from=" + route;
            //     route = "signin";
            //     debug( "redirect", dest );
            //     this.navigate( dest );
            // }
            this.dispatch( "router:route:completed", {
                route: route
            } );
        }, this );
    },

    navigateToUrl(data){
        debug('#navigateToUrl', data.url);
        this.navigate(data.url);
    },

    navigateToRoute: function( data ){
        this.navigate( data.route, { trigger: true } );
    }
} );
