'use strict';
var debug = require( 'bows' )( 'dpac:app' );

var app = module.exports = new Backbone.Marionette.Application();
var Context = Backbone.Geppetto.Context.extend( {
    initialize : function(){
        debug( "App#initialize" );

        Backbone.Geppetto.setDebug( true );
        this.vent.on('all', function(eventName, event){
            console.log('SYSTEM EVENT', event);
        });

        this.wireValue( 'app', app );
        this.wireCommands( {
            "app:startup.requested"         : [
                require( './controllers/SetupJQuery' ),
                require( './controllers/SetupHandlebars' ),
                require( './controllers/BootstrapDomain' ),
                require( './controllers/SetupI18N' )
            ],
            'SetupI18N:execution:completed' : require( './controllers/BootstrapUI' )
        } );
    }
} );

app.context = new Context();
app.context.dispatch( 'app:startup.requested' );
