'use strict';
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:core.controllers', '[ResultsModuleMediator]' );

var AssessContext = require( '../../results/ResultsContext' );
module.exports = Marionette.Controller.extend( {
    context: undefined,
    model: undefined,
    moduleContext: undefined,

    initialize: function(){
        debug.log( "#initialize" );
        this.relayToContext = function( event ){
            this.context.dispatch( event.eventName, event.eventData );
        }.bind( this );
        this.context.wireValue( 'resultsViewProxy', this.getMainView.bind( this ) );
        this.model.on( "change:authenticated", this.handleAuthenticationChange, this );
        this.handleAuthenticationChange();
    },

    relayEvents: function( events ){
        var self = this;
        _.each( events, function( event ){
            if( _.isString( event ) ){
                self.moduleContext.listen( self.moduleContext, event, self.relayToContext );
            } else {
                var source = event[ 0 ];
                var target = event[ 1 ];
                self.moduleContext.listen( self.moduleContext, source, function( event ){
                    self.context.dispatch( target, event );
                } );
            }
        } );
    },

    handleAuthenticationChange: function(){
        var context = this.context;
        if( this.model.get( 'authenticated' ) ){
            this.moduleContext = new AssessContext( {
                parentContext: context
            } );
            this.relayEvents( [
                "results:ui:destroyed",
                "results:teardown:requested",
                [ "results:show:messages", "results:show:messages" ]
            ] );
            this.moduleContext.start( this.model.get( 'user' ) );
        } else {
            //todo: break down?
        }
    },

    getMainView: function(){
        return this.moduleContext.getMainView();
    }
} );
