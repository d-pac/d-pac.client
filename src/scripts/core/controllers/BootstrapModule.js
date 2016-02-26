'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapModule]' );
var instruct = require( 'backbone.whenthen' );

module.exports = function BootstrapModule(){
};
_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );

        var context = this.context;
        context.wireCommands( {
            'config:load:requested': [ require( './ConfigureApplication' ) ],
            'app:domain:requested': [
                require( './BootstrapDomain' ),
                require( './BootstrapMediators' ),
                require( './SetupRemoteRequests' ),
                require( './SetupHBSHelpers' ),
                require( './SetupI18N' ),
                require( './SetupUserAccountSyncing' )
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
                debug('fetch pages');
                var collection = context.getObject( 'pagesCollection' );
                collection.once( "sync", function(){
                    context.dispatch( "pages:collection:sync" )
                } );
                collection.fetch();
            } )
            .when( 'authentication:state:authenticated' ).then( function(){
                debug('fetch assessments');
                var collection = context.getObject( 'assessmentsFacade' );
                collection.once( "sync", function(){
                    context.dispatch( "assessments:collection:sync" );
                } );
                collection.fetch();
            } )
            .when( 'assessments:collection:sync' ).then( function(){
                debug('separate assessments by role');
                var collection = context.getObject( 'assessmentsFacade' );
                var user = context.getObject( 'authenticationService' ).get( 'user' );
                collection.setRoles( user.assessments );
            } )
            .when( 'SetupI18N:execution:completed', 'authentication:status:completed' ).then( 'app:ui:requested' )
        ;

        //set off bootstrapping
        context.vent.trigger( 'app:bootstrap:requested' );
    }
} );
