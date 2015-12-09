'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:core.controllers', '[BaseModuleMediator]' );

var ProxyView = require( '../views/ProxyView' );
var relayEvents = require( '../mixins/relayEvents' );

module.exports = Marionette.Controller.extend( {
    context: undefined,
    model: undefined,
    moduleContext: undefined,

    initialize: function(opts){ //ModuleContext, viewProxyName, onUiReadyEvent, moduleToParentEvents, parentToModuleEvents
        this.opts = opts;
        debug.log( "#initialize", this );
        this.context.wireValue( this.opts.viewProxyName, this.getOrCreate.bind( this ) );
    },

    getOrCreate: function(){
        debug( '#getOrCreate' );
        if( !this.moduleContext ){
            this.proxyView = this.start();
        }else{
            this.proxyView = this.createProxyView(this.moduleContext);
        }
        return this.proxyView;
    },

    createProxyView: function(moduleContext){
        return new ProxyView( {
            contentFactory: moduleContext.getMainView.bind( moduleContext )
        } );
    },

    start: function(){
        debug( '#start' );
        var context = this.context;
        this.moduleContext = new this.opts.ModuleContext( {
            parentContext: context
        } );
        var proxyView = this.createProxyView(this.moduleContext);
        this.moduleContext.vent.once( this.opts.onUiReadyEvent, function(){
            proxyView.render();
        });

        this.relayEvents( this.moduleContext, this.opts.moduleToParentEvents, context );

        this.relayEvents( context, this.opts.parentToModuleEvents, this.moduleContext );

        this.moduleContext.start( this.model.get( 'user' ) );
        return proxyView;
    },

} );
relayEvents.mixin( module.exports );
