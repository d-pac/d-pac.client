'use strict';
var debug = require( 'debug' )( 'dpac:core.routers', '[RouteController]' );

module.exports = Backbone.Router.extend( {
    routes        : {
        "welcome"   : "land",
        "tutorial"  : "land",
        "signin"    : "land",
        "assess"    : "land",
        "account"   : "land",
        ""          : "land",
        "*notfound" : "land"
    },
    wiring        : ['authService'],

    initialize : function(){
        debug( '#initialize' );
        this.route('welcome', 'welcome', land('welcome'))
    }
} );
