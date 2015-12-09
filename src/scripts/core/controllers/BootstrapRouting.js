'use strict';
var Backbone = require('backbone');
var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapRouting]' );
var AppRouter = require( '../routers/AppRouter' );

var BootstrapRouting = module.exports = function BootstrapRouting( context ){
    debug( '#execute' );

    context.wireSingleton( 'routeController', AppRouter, {
        model: "authService"
    } );
    var routeController = context.getObject( 'routeController' );

    Backbone.history.start();
};
