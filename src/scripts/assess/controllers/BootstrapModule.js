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

        var instructor = instruct( this.context.vent );
        instructor
            .when( 'assess:bootstrap:requested' )
            .then( function(){
                assessmentsFacade.fetch();
            } )
            .when( 'assessments:collection:sync' )
            .then( function(){
                var user = context.getObject( 'accountModel' );
                var asAssessor = user.getAssessments( 'assessor' );
                context.wireValue( 'assessmentsCollection', assessmentsFacade.cloneSubset( asAssessor ) );
            }, 'assess:domain:requested' )
            .when( 'phases:collection:sync' )
            .then( function(){
                context.getObject( 'timelogsController' );
                context.getObject( 'navigationBlocker' );
                context.getObject( 'assessFlow' );
            }, 'assess:bootstrap:completed' )
            .when( 'assess:bootstrap:completed' )
            .then( function(){
                instructor.destroy();
            } );
        ;

        //set off bootstrapping
        context.vent.trigger( 'assess:bootstrap:requested' );
    }
} );
