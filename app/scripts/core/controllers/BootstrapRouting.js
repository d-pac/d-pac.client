'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapRouting]' );
var RouteController = require( '../routers/RouteController' );

var BootstrapRouting = module.exports = function BootstrapRouting( context ){
    debug( '#execute' );

    context.wireSingleton( 'routeController', RouteController );
    var routeController = context.getObject( 'routeController' );

    Backbone.history.start();
};
