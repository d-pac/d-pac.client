'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[AssessmentFlow]' );
var Marionette = require( 'backbone.marionette' );
var i18n = require('i18next');
var CurrentSelectionModel = require('../models/CurrentSelectionModel');
module.exports = Marionette.Controller.extend( {

    assessmentsCollection: undefined,
    comparisonsCollection: undefined,
    context: undefined,
    currentSelection: undefined,
    phasesCollection: undefined,
    representationsCollection: undefined,

    contextEvents: {
        "comparisons:continuation:confirmed": "selectComparison"
    },

    initialize: function(){
        debug( '#initialize' );
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
        this.selectComparison();
    },

    selectComparison: function selectComparison(){
        debug("#comparisonSelected");

        var current = this.currentSelection = new CurrentSelectionModel();
        var comparison = this.comparisonsCollection.at( 0 );
        var assessment = this.assessmentsCollection.get(comparison.get("assessment"));
        current.set({
            comparison: comparison,
            assessment: assessment,
            phases: this.phasesCollection,
            representations: this.representationsCollection
        });

        i18n.addResourceBundle(i18n.lng(), 'assessment', assessment.get('uiCopy'));

        this.context.wireValue('currentSelection', current);
        this.dispatch('comparisons:editing:requested', current);
    }
} );
