'use strict';
const {extend} = require( 'lodash' );

const debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapModule]' );
const instruct = require( 'backbone.whenthen' );

module.exports = function BootstrapModule(){
    //constructor
};
extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );

        const context = this.context;
        context.wireCommands( {
            'config:load:requested': [ require( './ConfigureApplication' ) ],
            'app:domain:requested': [
                require( './BootstrapDomain' ),
                require( './BootstrapMediators' ),
                require( './SetupRemoteRequests' ),
                require( './SetupHBSHelpers' ),
                require( './SetupI18N' ),
                require( './SetupUserAccountSyncing' ),
                require('./SetupJQuery')
            ],
            'app:ui:requested': [
                require( './BootstrapUI' ),
                require( './BootstrapRouting' )
            ],
            'router:route:completed': require( './RemoveHangingModal' )

        } );

        instruct( this.context.vent )
            .when( 'app:bootstrap:requested' ).then( 'config:load:requested' )
            .when( 'config:load:completed' ).then( 'app:domain:requested', 'authentication:status:requested', function(){
                debug( 'fetch pages' );
                const collection = context.getObject( 'pagesCollection' );
                collection.once( "sync", function(){
                    context.dispatch( "pages:collection:sync" );
                } );
                collection.fetch();
            } )
            .when( 'authentication:signout:completed' ).then( function(){
            //TODO: this HAS to be moved !!!
                const collection = context.getObject( 'assessmentsFacade' );
                collection.reset();
            } )
            .when( 'SetupI18N:execution:completed', 'authentication:status:completed' ).then( 'app:ui:requested' )
        ;

        //set off bootstrapping
        context.vent.trigger( 'app:bootstrap:requested' );
    }
} );
