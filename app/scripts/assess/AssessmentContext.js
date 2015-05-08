'use strict';

var _ = require( 'underscore' );
var Backbone = require( 'backbone' );
var Geppetto = require( 'backbone.geppetto' );
var debug = require( 'debug' )( 'dpac:assess', '[AssessmentContext]' );
var eventLog = require( 'debug' )( 'dpac:assess.events', '\u2709' );

module.exports = Geppetto.Context.extend( {
    initialize: function(){
        debug( "#initialize" );
        this.wireValue( 'assessmentContext', this );
        this.vent.on( 'all', function( eventName,
                                       event ){
            eventLog( eventName );
        } );
        this.wireCommand("assess:startup:requested", require('./controllers/BootstrapApplication'));
        //
        //var relay = function( event ){
        //    this.dispatch( event.eventName, event.eventData );
        //}.bind( this );
        //
        //this.parentContext.listen( this, "AuthService:signout:requested", relay );
        //
        //this.wireCommands( {
        //    "assessment:startup:requested": [
        //        require( './controllers/BootstrapDomain' ),
        //        require( './controllers/AssessmentFlow' ),
        //        require( './controllers/BootstrapUI' )
        //    ]
        //} );
    },

    start: function(){
        debug("#start");
        this.dispatch( 'assess:startup:requested' );
    },
    //getMainView: function(){
    //    var factory = this.getObject( 'MainView' );
    //    var view = factory();
    //    view.on( 'render', function(){
    //        this.dispatch( 'assessment:ui:rendered' );
    //    }, this );
    //    view.on( 'destroy', function(){
    //        this.dispatch( 'assessment:teardown:requested' );
    //        this.destroy();
    //    }, this );
    //    return view;
    //}
} );
_.extend( module.exports.prototype, Backbone.Events );
