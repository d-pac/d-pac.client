'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapApplication]' );
var instruct = require( 'backbone.whenthen' );

module.exports = function BootstrapApplication(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var context = this.context;
        context.wireCommands( {
            'assess:domain:requested': [
                require( './BootstrapDomain' ),
                require( './BootstrapUI' )
            ]
        } );

        instruct( this.context.vent )
            .when( 'assess:bootstrap:requested' ).then( 'assess:domain:requested', function fetchAssessments(){
                var collection = context.getObject( 'assessmentsCollection' );
                collection.once( "sync", function(){
                    context.dispatch( "assessments:collection:sync" );
                } );
                collection.fetch();
            } )
            .when( 'assessments:collection:sync' ).then( function fetchComparisons(){
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
            } ).then('assess:bootstrap:completed')
            .when('assess:bootstrap:completed' ).then(function(){
                var timelogs = context.getObject('timelogsController');
                var navigationBlocker = context.getObject('navigationBlocker');
                var assessmentFlow = context.getObject( 'assessmentFlow' );
                assessmentFlow.start();
            })
        ;

        //set off bootstrapping
        context.vent.trigger( 'assess:bootstrap:requested' );
    }
} );
