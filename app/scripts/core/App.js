'use strict';

var debug = require( 'debug' )( 'dpac:app', '[Context]' );
var konfy = require( 'konfy' );
var eventLog = require( 'debug' )( 'dpac:core.events', '\u2709' );

var app = module.exports = new Backbone.Marionette.Application();
var Context = Backbone.Geppetto.Context.extend( {
    initialize : function( config ){
        debug( "#initialize" );

        Backbone.Geppetto.setDebug( true );
        this.vent.on( 'all', function( eventName,
                                       event ){
            eventLog( eventName );
        } );

        this.wireValue( 'config', config );
        this.wireValue( 'host', config.api.host );
        this.wireValue( 'appContext', this );
        this.wireValue( 'app', app );
        this.wireValue('appVersion', config.app.version);


        this.wireSingleton( 'errorsCollection', require( './collections/ErrorsCollection' ) );
        this.configure('errorsCollection', undefined, config.errorlogs);

        this.wireSingleton( 'pendingRequests', require( './collections/PendingRequestsCollection' ) );
        this.getObject( 'pendingRequests' );


        this.wireCommands( {
            "app:startup.requested"         : [
                require( './controllers/SetupRemoteRequests' ),
                require( './controllers/SetupHBSHelpers' ),
                require( './controllers/SetupHBSPartials' ),
                require( './controllers/BootstrapDomain' ),
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

    var app = this;
    konfy.load( {
        configFile : "scripts/core/config.json",
        values : {
            API_HOST : process.env.API_HOST,
            APP_VERSION : process.env.APP_VERSION
        }
    }, function( err,
                 config ){
        app.context = new Context( config );
        app.context.dispatch( 'app:startup.requested' );
    } );
} );


