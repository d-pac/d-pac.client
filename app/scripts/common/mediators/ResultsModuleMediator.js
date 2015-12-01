'use strict';
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:core.controllers', '[ResultsModuleMediator]' );

var AssessContext = require( '../../results/ResultsContext' );

var relayEvents = require( '../mixins/relayEvents' );

module.exports = Marionette.Controller.extend( {
    context: undefined,
    model: undefined,
    moduleContext: undefined,

    initialize: function(){
        debug.log( "#initialize" );
        this.context.wireValue( 'resultsViewProxy', this.getMainView.bind( this ) );
        this.model.on( "change:authenticated", this.handleAuthenticationChange, this );
        this.handleAuthenticationChange();
    },

    handleAuthenticationChange: function(){
        var context = this.context;
        if( this.model.get( 'authenticated' ) ){
            this.moduleContext = new AssessContext( {
                parentContext: context
            } );
            this.relayEvents( this.moduleContext, [
                "results:ui:destroyed",
                "results:teardown:requested",
                [ "results:show:messages", "app:show:messages" ]
            ], context );
            this.moduleContext.start( this.model.get( 'user' ) );
        } else {
            //todo: break down?
        }
    },

    getMainView: function(){
        return this.moduleContext.getMainView();
    }
} );
relayEvents.mixin( module.exports );
