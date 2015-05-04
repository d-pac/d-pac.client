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
            'bootstrap:core:requested': [
                require( './BootstrapMetaDomain' ),
                require( './SetupRemoteRequests' ),
                require( './SetupClipboard' ),
                require( './SetupHBSHelpers' ),
                require( './SetupHBSPartials' ),
                require( './BootstrapDomain' ),
                require( './SetupI18N' )
            ],
            'bootstrap:view:requested': [
                require( './BootstrapUI' ),
                require( './BootstrapRouting' )
            ]
        } );

        instruct( this.context.vent )
            .when( 'bootstrap:application:requested' ).then( 'config:load:requested' )
            .when( 'config:load:completed' ).then( 'bootstrap:core:requested', 'login:status:requested' )
            .when( 'SetupI18N:execution:completed', 'AuthService:getStatus:succeeded' ).then( 'bootstrap:view:requested' )
        ;

        //set off bootstrapping
        this.context.vent.trigger( 'bootstrap:application:requested' );
    }
} );
