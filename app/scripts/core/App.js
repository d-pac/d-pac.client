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
        this.wireCommand( "app:startup:requested", require( './controllers/BootstrapApplication' ) );

        //this.wireValue( 'config', config );
        //this.wireValue( 'host', config.api.host );
        //this.wireValue('appVersion', config.app.version);
        //
        //
        //this.wireSingleton( 'errorsCollection', require( './collections/ErrorsCollection' ) );
        //this.configure('errorsCollection', undefined, config.errorlogs);
        //
        //this.wireSingleton( 'pendingRequests', require( './collections/PendingRequestsCollection' ) );
        //this.getObject( 'pendingRequests' );
        //
        //
        //this.wireCommands( {
        //    "app:startup.requested"         : [
        //        require( './controllers/SetupRemoteRequests' ),
        //        require( './controllers/SetupClipboard' ),
        //        require( './controllers/SetupHBSHelpers' ),
        //        require( './controllers/SetupHBSPartials' ),
        //        require( './controllers/BootstrapDomain' ),
        //        require( './controllers/SetupI18N' )
        //    ],
        //    'SetupI18N:execution:completed' : [
        //        require( './controllers/BootstrapUI' ),
        //        require( './controllers/BootstrapRouting' )
        //    ]
        //} );
    }
} );
app.on( 'start', function(){
    debug( 'App#start' );

    var app = this;
    app.context = new Context();
    app.context.dispatch( 'app:startup:requested' );
    //konfy.load( {
    //    configFile : "scripts/core/config.json",
    //    values : {
    //        API_HOST : process.env.API_HOST,
    //        APP_VERSION : process.env.APP_VERSION
    //    }
    //}, function( err,
    //             config ){
    //    app.context = new Context( config );
    //    app.context.dispatch( 'app:startup.requested' );
    //} );
} );


