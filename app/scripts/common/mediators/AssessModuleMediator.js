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
        this.context.wireValue( 'assessmentViewProxy', this.getOrCreate.bind( this ) );
    },

    getOrCreate: function(){
        if(!this.moduleContext){
            this.start();
        }
        return this.moduleContext.getMainView();
    },

    start: function(){
        var context = this.context;
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
    },

} );

relayEvents.mixin( module.exports );
