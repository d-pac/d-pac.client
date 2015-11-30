'use strict';
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:core.controllers', '[AssessModuleMediator]' );

var AssessContext = require( '../../assess/AssessContext' );
module.exports = Marionette.Controller.extend( {
    context: undefined,
    model: undefined,
    moduleContext: undefined,

    initialize: function(){
        debug.log( "#initialize" );
        this.relayToContext = function( event ){
            debug( 'RELAY EVENT', event );
            this.context.dispatch( event.eventName, event.eventData );
        }.bind( this );

        this.context.wireValue( 'assessmentViewProxy', this.getMainView.bind( this ) );
        this.model.on( "change:authenticated", this.handleAuthenticationChange, this );
        this.handleAuthenticationChange();
    },

    handleAuthenticationChange: function(){
        var context = this.context;
        if( this.model.get( 'authenticated' ) ){
            this.moduleContext = new AssessContext( {
                parentContext: context
            } );
            this.moduleContext.listen( this.moduleContext, "assess:ui:destroyed", this.relayToContext );
            this.moduleContext.listen( this.moduleContext, "assess:teardown:requested", this.relayToContext );
            this.moduleContext.listen( this.moduleContext, "app:show:messages", this.relayToContext );
            this.moduleContext.start( this.model.get( 'user' ) );
        } else {
            //todo: break down?
        }
    },

    getMainView: function(){
        return this.moduleContext.getMainView();
    }
} );
