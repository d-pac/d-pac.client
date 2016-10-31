'use strict';
const { extend } = require( 'lodash' );

const debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapModule]' );
const instruct = require( 'backbone.whenthen' );

module.exports = function BootstrapModule(){
    //constructor
};

extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        const context = this.context;
        const assessmentsFacade = context.getObject( 'assessmentsFacade' );
        context.wireCommands( {
            'assess:domain:requested': [
                require( './BootstrapDomain' ),
                require( './../../common/controllers/SetupAssessmentI18NSyncing' ),
                require( './BootstrapUI' )
            ]
        } );

        const instructor = instruct( this.context.vent );
        instructor
            .when( 'assess:bootstrap:requested' )
            .then( ()=> assessmentsFacade.fetch() )
            .when( 'assessments:collection:sync' )
            .then( function(){
                    const user = context.getObject( 'accountModel' );
                    const asAssessor = user.getAssessments( 'assessor' );
                    const subCollection = assessmentsFacade.listById( asAssessor );
                    context.addPubSub(subCollection);
                    context.wireValue( 'assessmentsCollection', subCollection );
                },
                'assess:domain:requested',
                ()=>context.getObject( 'phasesCollection' ).fetch()
            )
            .when( 'phases:collection:sync' )
            .then( function(){
                context.getObject( 'timelogsController' );
                // context.getObject( 'navigationBlocker' );
            }, 'assess:bootstrap:completed' , function(){
                context.getObject( 'comparisonFlow' );
                instructor.destroy();
            } );

        //set off bootstrapping
        context.vent.trigger( 'assess:bootstrap:requested' );
    }
} );
