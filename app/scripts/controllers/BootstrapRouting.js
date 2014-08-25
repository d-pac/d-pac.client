'use strict';
var debug = require( 'bows' )( 'dpac:commands' );
var RouteController = require('../routers/RouteController');

var BootstrapRouting = module.exports = function BootstrapRouting(){
};

_.extend( BootstrapRouting.prototype, {
    execute : function execute(){
        debug('BootstrapRouting#execute');

        this.context.wireSingleton('routeController', RouteController);
        var routeController = this.context.getObject('routeController');

        //bind it to the context to allow automatic listening to context events
        Backbone.Geppetto.bindContext({
            view: routeController,
            context : this.context
        });

        Backbone.history.start();
    }
} );
