'use strict';
var debug = require( 'bows' )( 'dpac:controllers' );
var RouteController = require( '../routers/RouteController' );

var BootstrapRouting = module.exports = function BootstrapRouting( context ){
    debug( 'BootstrapRouting#execute' );

    context.wireSingleton( 'routeController', RouteController );
    var routeController = context.getObject( 'routeController' );

    Backbone.history.start();
};
