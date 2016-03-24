'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:uploads.controllers', '[BootstrapModule]' );
var instruct = require( 'backbone.whenthen' );

module.exports = function BootstrapModule(){
};

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var context = this.context;
        var assessmentsFacade = context.getObject( 'assessmentsFacade' );

        context.wireCommands( {
            'uploads:domain:requested': [
                require( './BootstrapDomain' ),
                require( './LoadRepresentations' )
                // require( './SetupAssessmentI18NSyncing' ),
                // require( './LoadPhases' ),
                // require( './BootstrapUI' )
            ]
        } );

        var instructor = instruct( this.context.vent );
        instructor
            .when( 'uploads:bootstrap:requested' ).then( function(){
                assessmentsFacade.fetch();
            } )
            .when( 'assessments:collection:sync' ).then( function(){
                var user = context.getObject( 'accountModel' );
                var asAssessee = user.getAssessments( 'assessee' );
                context.wireValue( 'assessmentsCollection', assessmentsFacade.cloneSubset( asAssessee ) );
            }, 'uploads:domain:requested', 'uploads:bootstrap:completed' )
            .when( 'uploads:bootstrap:completed' ).then( function(){
            instructor.destroy();
        } )

        //set off bootstrapping
        context.vent.trigger( 'uploads:bootstrap:requested' );
    }
} );
