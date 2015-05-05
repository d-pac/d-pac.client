'use strict';

var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapApplication]' );
var instruct = require( 'backbone.whenthen' );

module.exports = function BootstrapApplication(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );

        this.context.wireCommands( {
            'config:load:requested': [ require( './LoadConfiguration' ) ],
            'app:domain:requested': [
                require( './BootstrapDomain' ),
                require( './SetupRemoteRequests' ),
                require( './SetupClipboard' ),
                require( './SetupHBSHelpers' ),
                require( './SetupHBSPartials' ),
                require( './SetupI18N' )
            ],
            'app:ui:requested': [
                require( './BootstrapUI' ),
                require( './BootstrapRouting' )
            ]
        } );

        instruct( this.context.vent )
            .when( 'bootstrap:application:requested' )
                .then( 'config:load:requested' )
            .when( 'config:load:completed' )
                .then( 'app:domain:requested', 'authentication:status:requested', 'pages:collection:requested' )
            .when( 'SetupI18N:execution:completed', 'authentication:status:completed', 'pages:collection:sync' )
                .then( 'app:ui:requested' )
        ;

        //set off bootstrapping
        this.context.vent.trigger( 'bootstrap:application:requested' );
    }
} );
