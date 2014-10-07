'use strict';

var debug = require( 'debug' )( 'dpac:assess', '[AssessmentContext]' );
var eventLog = require( 'debug' )( 'dpac:assess.events', '\u2709' );

module.exports = Backbone.Geppetto.Context.extend( {
    initialize  : function(){
        debug( "#initialize" );
        this.vent.on( 'all', function( eventName,
                                       event ){
            eventLog( eventName );
        } );
        this.wireValue( 'assessmentContext', this );
        this.wireCommands( {
            "assessment:startup:requested" : [
                require( './controllers/BootstrapDomain' ),
                require( './controllers/AssessmentFlow' ),
                require( './controllers/BootstrapUI' )
            ],
            "mementos:selection:completed" : require( './controllers/MementoFlow' )
        } );
    },
    start       : function(){
        this.dispatch( 'assessment:startup:requested' );
    },
    getMainView : function(){
        var factory = this.getObject( 'MainView' );
        var view = factory();
        view.on( 'render', function(){
            this.dispatch( 'assessment:ui:rendered' );
        }, this );
        return view;
    }
} );
