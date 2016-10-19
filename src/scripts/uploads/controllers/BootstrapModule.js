'use strict';
const {extend} = require( 'lodash' );

const debug = require( 'debug' )( 'dpac:uploads.controllers', '[BootstrapModule]' );
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
            'uploads:domain:requested': [
                require( './BootstrapDomain' ),
                require( './LoadRepresentations' ),
                require( './BootstrapUI' )
            ]
        } );

        const instructor = instruct( this.context.vent );
        instructor
            .when( 'uploads:bootstrap:requested' )
            .then( function(){
                assessmentsFacade.fetch();
            } )
            .when( 'assessments:collection:sync' )
            .then( function(){
                const user = context.getObject( 'accountModel' );
                const asAssessee = user.getAssessments( 'assessee' );
                context.wireValue( 'assessmentsCollection', assessmentsFacade.listById( asAssessee ) );
            }, 'uploads:domain:requested' )
            .when( 'representations:collection:sync' )
            .then( 'uploads:bootstrap:completed' )
            .when( 'uploads:bootstrap:completed' )
            .then( function(){
                instructor.destroy();
            } )
        ;
        //set off bootstrapping
        context.vent.trigger( 'uploads:bootstrap:requested' );
    }
} );
