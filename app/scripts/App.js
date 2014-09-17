'use strict';
var bows = require( 'bows' );
bows.config({
    padLength: 20
});


var debug = bows( 'dpac:app' );
var config = require( './config' );
var eventLog = bows('dpac:event');

var app = module.exports = new Backbone.Marionette.Application();
var Context = Backbone.Geppetto.Context.extend( {
    initialize : function(){
        debug( "Context#initialize" );

        Backbone.Geppetto.setDebug( true );
        this.vent.on( 'all', function( eventName,
                                       event ){
            eventLog( eventName );
        } );

        this.wireValue( 'config', config );
        this.wireValue( 'context', this );
        this.wireValue( 'app', app );
        this.wireCommands( {
            "app:startup.requested"         : [
                require( './controllers/SetupHBSHelpers' ),
                require( './controllers/SetupHBSPartials' ),
                require( './controllers/BootstrapDomain' ),
                require( './controllers/SetupRemoteRequests' ),
                require( './controllers/SetupI18N' )
            ],
            'SetupI18N:execution:completed' : [
                require( './controllers/BootstrapUI' ),
                require( './controllers/BootstrapRouting' )
            ]
        } );
    }
} );
app.on( 'start', function(){
    debug( 'App#start' );
    this.context = new Context();
    this.context.dispatch( 'app:startup.requested' );
} );


