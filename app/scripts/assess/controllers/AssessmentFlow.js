'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[AssessmentFlow]' );
var Marionette = require( 'backbone.marionette' );
module.exports = Marionette.Controller.extend( {

    assessmentsCollection: undefined,
    comparisonsCollection: undefined,
    context: undefined,

    wiring: {
        assessmentsCollection: "assessmentsCollection",
        comparisonsCollection: "comparisonsCollection",
        context: "assessmentContext"
    },

    contextEvents: {
        "comparisons:continuation:confirmed": "continueComparison"
    },

    initialize: function(){
        debug( '#initialize' );
    },

    execute: function(){
        debug( '#execute' );
    },

    teardown: function(){
        debug( "#teardown" );
        this.comparisonsCollection = undefined;
        this.assessmentsCollection = undefined;
        this.stopListening();
        this.context = undefined;
        this.eventData = undefined;
        this.eventName = undefined;
    },

    start: function(){
        this.verifyComparisonsState();
    },

    verifyComparisonsState: function verifyComparisonsState(){
        debug( "#verifyComparisonsState" );
        if( this.comparisonsCollection.length ){
            //interrupted comparisons exist
            this.dispatch( 'comparisons:continuation:requested' )
        } else {
            this.verifyRootAssessments();
        }
    },

    continueComparison: function continueComparison(){
        var comparison = this.comparisonsCollection.at( 0 )
        this.comparisonsCollection.select( comparison );
        this.dispatch('comparisons:selection:completed', comparison);
    },

    verifyRootAssessments: function verifyRootAssessments(){
        if( 1 === this.assessmentsCollection.rootAssessments.length ){
            //automatic selection
            this.assessmentsCollection.select( this.assessmentsCollection.rootAssessments[ 0 ] );
        } else {
            this.dispatch( 'assessments:selection:requested' );
        }
    },

    assessmentSelectionCompleted: function(){
        debug( '#assessmentSelectionCompleted' );
        this.requestComparisonCreation();
    },

    requestComparisonCreation: function(){
        debug( '#requestComparisonCreation' );
        var assessment = this.assessmentsCollection.selected;

        this.comparisonsCollection.once( "add", this.comparisonCreationCompleted, this );
        this.comparisonsCollection.create( {
            assessment: assessment.id
        }, { wait: true } );
    },

    comparisonCreationCompleted: function( comparison ){
        debug( '#comparisonCreationCompleted' );
        this.comparisonsCollection.select( comparison );
    }
} );
