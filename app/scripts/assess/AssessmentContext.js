'use strict';

var _ = require( 'underscore' );
var debug = require( 'debug' )( 'dpac:assess', '[AssessmentContext]' );
var eventLog = require( 'debug' )( 'dpac:assess.events', '\u2709' );

module.exports = Backbone.Geppetto.Context.extend( {
    initialize: function(){
        debug( "#initialize" );

        var relay = function( event ){
            this.dispatch( event.eventName, event.eventData );
        }.bind( this );

        this.parentContext.listen( this, "AuthService:signout:requested", relay );

        this.vent.on( 'all', function( eventName,
                                       event ){
            eventLog( eventName );
        } );
        this.wireValue( 'assessmentContext', this );
        this.wireCommands( {
            "assessment:startup:requested": [
                require( './controllers/BootstrapDomain' ),
                require( './controllers/AssessmentFlow' ),
                require( './controllers/BootstrapUI' )
            ]
        } );
    },
    start: function(){
        this.dispatch( 'assessment:startup:requested' );
    },
    getMainView: function(){
        var factory = this.getObject( 'MainView' );
        var view = factory();
        view.on( 'render', function(){
            this.dispatch( 'assessment:ui:rendered' );
        }, this );
        view.on( 'destroy', function(){
            this.dispatch( 'assessment:teardown:requested' );
            this.destroy();
        }, this );
        return view;
    }
} );
_.extend( module.exports.prototype, Backbone.Events );
