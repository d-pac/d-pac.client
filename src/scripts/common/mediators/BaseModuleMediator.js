'use strict';
const {Controller} = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:core.controllers', '[BaseModuleMediator]' );

const ProxyView = require( '../views/ProxyView' );
const relayEvents = require( '../mixins/relayEvents' );

module.exports = Controller.extend( {
    context: undefined,
    model: undefined,
    moduleContext: undefined,

    initialize: function( opts ){ //ModuleContext, viewProxyName, onUiReadyEvent, moduleToParentEvents, parentToModuleEvents
        this.opts = opts;
        debug( "#initialize", this );
        this.context.wireValue( this.opts.viewProxyName, this.getOrCreate.bind( this ) );
    },

    getOrCreate: function(){
        debug( '#getOrCreate' );
        //if( !this.moduleContext ){
        //    this.proxyView = this.start();
        //}else{
        //    this.proxyView = this.createProxyView(this.moduleContext);
        //}
        const contentFactory = (this.moduleContext)
            ? this.moduleContext.getMainView.bind( this.moduleContext )
            : this.opts.contentFactory.bind( this );
        this.proxyView = new ProxyView( {
            contentFactory: contentFactory
        } );
        return this.proxyView;
    },

    prepareModule: function( ModuleContext ){
        this.moduleContext = new ModuleContext( {
            parentContext: this.context
        } );
        this.moduleContext.vent.once( this.opts.onUiReadyEvent, function(){
            this.proxyView.contentFactory = this.moduleContext.getMainView.bind( this.moduleContext );
            this.proxyView.render();
        }, this );

        this.relayEvents( this.moduleContext, this.opts.moduleToParentEvents, this.context );

        this.relayEvents( this.context, this.opts.parentToModuleEvents, this.moduleContext );

        this.moduleContext.start( this.model.get( 'user' ) );
    },

    destroyModule: function(){
        debug('#destroyModule');
        if(this.moduleContext){
            this.moduleContext.destroy();
            this.moduleContext = undefined;
        }
    }
} );
relayEvents.mixin( module.exports );
