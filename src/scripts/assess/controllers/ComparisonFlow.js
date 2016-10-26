'use strict';
const debug = require( 'debug' )( 'dpac:assess.controllers', '[ComparisonFlow]' );
const { Controller } = require( 'backbone.marionette' );

module.exports = Controller.extend( {

    comparisonsCollection: undefined,

    contextEvents: {
        "assessments:selection:changed": "checkUnfinishedComparisons"
    },

    initialize(){
        debug( '#initialize' );

        this.dispatch( 'assessments:selection:requested' );
    },

    checkUnfinishedComparisons( assessment ){
        debug('#checkUnfinishedComparisons' );
        const unfinished = this.comparisonsCollection.getActivesFor({assessment: assessment.id});
        if(unfinished.length){
            this.comparisonsCollection.select(unfinished[0]);
        }else{
            //request creation
        }
    },
} );
