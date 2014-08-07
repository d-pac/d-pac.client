'use strict';

module.exports = Backbone.Geppetto.Context.extend( {

    initialize : function(){
        console.log( "Geppetto context coming up!" );

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
