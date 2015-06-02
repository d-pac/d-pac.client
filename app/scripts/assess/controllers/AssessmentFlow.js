'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[AssessmentFlow]' );
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var i18n = require( 'i18next' );
var CurrentSelectionModel = require( '../models/CurrentSelectionModel' );

module.exports = Marionette.Controller.extend( {

    assessmentsCollection: undefined,
    comparisonsCollection: undefined,
    context: undefined,
    currentSelection: undefined,
    phasesCollection: undefined,
    representationsCollection: undefined,
    timelogsCollection: undefined,

    contextEvents: {
        "comparisons:unfinished:confirmed": "selectComparison",
        "comparisons:continue:confirmed": "continueComparisonConfirmed",
        "assessments:selection:completed": "assessmentSelectionCompleted",
        "assess:ui:rendered": "start"
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
        if( this.comparisonsCollection.hasActives() ){
            //interrupted comparisons exist
            this.dispatch( 'comparisons:unfinished:requested' );
        } else if( this.assessmentsCollection.selected ){
            this.dispatch( 'comparisons:continue:requested' );
        } else {
            this.dispatch( 'assessments:selection:requested' );
        }
    },

    //verifyActiveAssessments: function verifyActiveAssessments(){
    //    var actives = this.assessmentsCollection.getActives();
    //    if( 1 === actives.length ){
    //        //automatic selection
    //        //this.assessmentSelectionCompleted({assessment: actives[0]});
    //        this.dispatch( 'comparisons:continue:requested' );
    //    } else {
    //        this.dispatch( 'assessments:selection:requested' );
    //    }
    //},

    continueComparisonConfirmed: function(){
        var model = this.assessmentsCollection.selected || this.assessmentsCollection.select( this.assessmentsCollection.getActives()[ 0 ] );
        this.assessmentSelectionCompleted( { assessment: model } );
    },

    assessmentSelectionCompleted: function( event ){
        debug( '#assessmentSelectionCompleted' );
        this.requestComparisonCreation( event.assessment );
    },

    requestComparisonCreation: function( assessment ){
        debug( '#requestComparisonCreation', assessment );

        this.comparisonsCollection.once( "add", this.comparisonCreationCompleted, this );
        this.comparisonsCollection.create( {
            assessment: assessment.id
        }, { wait: true } );
    },

    comparisonCreationCompleted: function( comparison ){
        debug( '#comparisonCreationCompleted', comparison );

        if( comparison.hasMessages() ){
            var messages = _.clone( comparison.get( 'messages' ) );
            this.comparisonsCollection.remove(comparison);
            this.dispatch( 'comparisons:creation:failed', { messages: messages, assessment: this.assessmentsCollection.selected } );
        } else {
            this.selectComparison();
        }
    },

    selectComparison: function selectComparison(){
        debug( "#comparisonSelected" );

        var comparison = this.comparisonsCollection.at( 0 );
        var assessment = this.assessmentsCollection.get( comparison.get( "assessment" ) );
        this.assessmentsCollection.select( assessment );
        var current = this.currentSelection = new CurrentSelectionModel( {
            comparison: comparison,
            assessment: assessment,
            phases: this.phasesCollection,
            representations: this.representationsCollection
        } );

        i18n.addResourceBundle( i18n.lng(), 'assessment', assessment.get( 'uiCopy' ) );

        this.context.wireValue( 'currentSelection', current );
        this.dispatch( 'comparisons:editing:requested', { current: current } );

        current.once( "change:completed", this.finalizeComparison, this );
    },

    finalizeComparison: function(){
        var comparison = this.currentSelection.get( 'comparison' );
        var assessment = this.currentSelection.get( 'assessment' );
        this.comparisonsCollection.teardownModel( comparison );
        assessment.incCompleted();
        this.context.release( 'currentSelection' );
        this.currentSelection = undefined;
        this.verifyComparisonsState();
    }
} );
