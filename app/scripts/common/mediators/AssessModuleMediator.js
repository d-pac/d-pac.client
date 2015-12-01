'use strict';
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:core.controllers', '[AssessModuleMediator]' );

var AssessContext = require( '../../assess/AssessContext' );

var relayEvents = require( '../mixins/relayEvents' );
module.exports = Marionette.Controller.extend( {
    context: undefined,
    model: undefined,
    moduleContext: undefined,

    initialize: function(){
        debug.log( "#initialize" );
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
            this.relayEvents( this.moduleContext, [
                "assess:ui:destroyed",
                "assess:teardown:requested",
                [ "assess:show:messages", "app:show:messages" ]
            ], context );
            this.relayEvents( context, [
                "assessments:collection:sync"
            ], this.moduleContext );
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
