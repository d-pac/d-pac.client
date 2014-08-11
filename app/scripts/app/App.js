'use strict';
var log = require('bows')('dpac:App');

var app = module.exports = new Backbone.Marionette.Application();
var Context = Backbone.Geppetto.Context.extend({
    initialize : function(){
        log( "initialize" );

        Backbone.Geppetto.setDebug( true );
        this.wireValue('app', app);
        this.wireCommands( {
            "app:startup.requested" : [
                require( './commands/RegisterHelpers' ),
                require( './commands/SetupI18N' )
            ],
            'SetupI18N:execution:completed': require('./commands/BootstrapUI')
        } );
    }
});

app.context = new Context();
app.context.dispatch( 'app:startup.requested' );
