'use strict';
var log = require('bows')('dpac:App');

module.exports = Backbone.Geppetto.Context.extend( {

    initialize : function(){
        log( "initialize" );

        Backbone.Geppetto.setDebug( true );

        this.wireCommands( {
            "app:startup.requested" : [
                require( './commands/RegisterHelpers.js' ),
                require( './commands/SetupI18N' )
            ]
        } );
        this.dispatch( 'app:startup.requested' );
    }
} );
