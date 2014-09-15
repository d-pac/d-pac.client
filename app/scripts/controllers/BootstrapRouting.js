'use strict';
var debug = require( 'bows' )( 'dpac:controllers' );
var RouteController = require( '../routers/RouteController' );

var BootstrapRouting = module.exports = function BootstrapRouting( context ){
    debug( 'BootstrapRouting#execute' );

    context.wireSingleton( 'routeController', RouteController );
    var routeController = context.getObject( 'routeController' );

    //bind it to the context to allow automatic listening to context events
    Backbone.Geppetto.bindContext( {
        view    : routeController,
        context : context
    } );

    Backbone.history.start();
};
