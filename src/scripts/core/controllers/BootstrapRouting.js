'use strict';
const {history} = require('backbone');
const debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapRouting]' );
const AppRouter = require( '../routers/AppRouter' );

module.exports = function BootstrapRouting( context ){
    debug( '#execute' );

    context.wireSingleton( 'routeController', AppRouter, {
        model: "authenticationService",
        permissions: "authorizationModel"
    } );
    context.getObject( 'routeController' );

    history.start();
};
