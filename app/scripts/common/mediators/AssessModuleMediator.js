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
        this.context.wireValue( 'assessmentViewProxy', this.getMainView.bind( this ) );
        this.model.on( "change:authenticated", this.handleAuthenticationChange, this );
        this.handleAuthenticationChange();
    },

    remapEvent: function(from, source, to, target){
        from.vent.on( source, function(){
            to.dispatch.apply( to, [ target ].concat( _.toArray( arguments ) ) );
        } );
    },

    relayEvents: function( from,
                           events,
                           to ){
        _.each( events, function( event ){
            if( _.isString( event ) ){
                this.remapEvent(from, event, to, event);
            } else {
                var source = event[ 0 ];
                var target = event[ 1 ];
                this.remapEvent(from, source, to, target);
            }
        }, this );
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