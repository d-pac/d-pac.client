'use strict';
const {Application} = require('backbone.marionette');
const Geppetto = require('backbone.geppetto');
const debug = require( 'debug' )( 'dpac:app', '[Context]' );
const eventLog = require( 'debug' )( 'dpac:core.events', '\u2709' );

const app = module.exports = new Application();
const AppContext = Geppetto.Context.extend( {
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

    const app = this;
    app.context = new AppContext();
    app.context.dispatch( 'app:startup:requested' );
} );


