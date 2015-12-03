'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:results.controllers', '[BootstrapModule]' );
var instruct = require( 'backbone.whenthen' );

module.exports = function BootstrapModule(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var context = this.context;
        var assessmentsFacade = context.getObject( 'assessmentsFacade' );

        context.wireCommands( {
            'results:bootstrap:requested': [ require( './BootstrapDomain' ) ],
            'results:ui:requested': [
                require( './BootstrapUI' )
            ],
            'results:assessment:selected': [ require( './LoadRepresentations' ) ]
        } );

        var proceedEvent = (assessmentsFacade.isSynced())
            ? 'results:bootstrap:requested'
            : 'assessments:collection:sync';
        instruct( this.context.vent )
            .when( proceedEvent ).then( function(){
            context.wireValue( 'assessmentsCollection', assessmentsFacade.getForRole( 'pam' ) );
        }, 'results:ui:requested', 'results:bootstrap:completed' );

        //instruct( this.context.vent )
        //    .when( 'results:bootstrap:requested' ).then( 'results:domain:requested', function fetchAssessments(){
        //        var collection = context.getObject( 'assessmentsCollection' );
        //        collection.once( "sync", function(){
        //            context.dispatch( "assessments:collection:sync" );
        //        } );
        //        collection.fetch();
        //    } )
        //    .when( 'assessments:collection:sync' ).then( function fetchComparisons(){
        //        var collection = context.getObject( 'comparisonsCollection' );
        //        collection.once( "sync", function(){
        //            context.dispatch( "comparisons:collection:sync" );
        //        } );
        //        collection.fetch();
        //    } )
        //    .when( 'comparisons:collection:sync' ).then( function fetchPhases(){
        //        var collection = context.getObject( 'phasesCollection' );
        //        collection.once( "sync", function(){
        //            context.dispatch( "phases:collection:sync" );
        //        } );
        //        collection.fetch();
        //    } ).then('results:bootstrap:completed')
        //    .when('results:bootstrap:completed' ).then(function(){
        //        var timelogs = context.getObject('timelogsController');
        //        var navigationBlocker = context.getObject('navigationBlocker');
        //        var assessFlow = context.getObject( 'assessFlow' );
        //        assessFlow.start();
        //    })
        //;
        //
        //set off bootstrapping
        context.vent.trigger( 'results:bootstrap:requested' );
    }
} );
