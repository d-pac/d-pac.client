'use strict';
var Marionette = require('backbone.marionette');
var Geppetto = require('backbone.geppetto');
var debug = require( 'debug' )( 'dpac:app', '[Context]' );
var eventLog = require( 'debug' )( 'dpac:core.events', '\u2709' );

var app = module.exports = new Marionette.Application();
var Context = Geppetto.Context.extend( {
    initialize: function( config ){
        debug( "#initialize" );
        Geppetto.setDebug( true );
        this.vent.on( 'all', function( eventName,
                                       event ){
            eventLog( eventName );
        } );

        this.wireValue( 'appContext', this );
        this.wireValue( 'app', app );
        this.wireCommand( "app:startup:requested", require( './controllers/BootstrapModule' ) );

    }
} );
app.on( 'start', function(){
    debug( 'App#start' );

    var app = this;
    app.context = new Context();
    app.context.dispatch( 'app:startup:requested' );
} );


