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
                require( './SetupAssessmentI18NSyncing' ),
                require( './LoadPhases' ),
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
            .when( 'phases:collection:sync' ).then( function(){
            context.getObject( 'timelogsController' );
            context.getObject( 'navigationBlocker' );
            var assessFlow = context.getObject( 'assessFlow' );
            assessFlow.start();
        }, 'assess:bootstrap:completed' );

        //set off bootstrapping
        context.vent.trigger( 'assess:bootstrap:requested' );
    }
} );
