'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapModule]' );
var instruct = require( 'backbone.whenthen' );

module.exports = function BootstrapModule(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var context = this.context;
        var assessmentsFacade = context.getObject( 'assessmentsFacade' );
        context.wireCommands( {
            'assess:domain:requested': [
                require( './BootstrapDomain' ),
                require( './BootstrapUI' )
            ]
        } );

        var proceedEvent = (assessmentsFacade.isSynced())
            ? 'assess:bootstrap:requested'
            : 'assessments:collection:sync';

        instruct( this.context.vent )
            .when( proceedEvent ).then( function(){
                context.wireValue( 'assessmentsCollection', assessmentsFacade.getForRole( 'assessor' ) );
            }, 'assess:domain:requested' )
            .when( 'assess:domain:requested' ).then( function fetchComparisons(){
                var collection = context.getObject( 'comparisonsCollection' );
                collection.once( "sync", function(){
                    context.dispatch( "comparisons:collection:sync" );
                } );
                collection.fetch();
            } )
            .when( 'comparisons:collection:sync' ).then( function fetchPhases(){
                var collection = context.getObject( 'phasesCollection' );
                collection.once( "sync", function(){
                    context.dispatch( "phases:collection:sync" );
                } );
                collection.fetch();
            }, 'assess:bootstrap:completed' )
            .when( 'assess:bootstrap:completed' ).then( function(){
            var timelogs = context.getObject( 'timelogsController' );
            var navigationBlocker = context.getObject( 'navigationBlocker' );
            var assessFlow = context.getObject( 'assessFlow' );
            assessFlow.start();
        } )
        ;

        //set off bootstrapping
        context.vent.trigger( 'assess:bootstrap:requested' );
    }
} );
