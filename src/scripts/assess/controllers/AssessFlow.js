'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[AssessFlow]' );
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var i18n = require( 'i18next' );
module.exports = Marionette.Controller.extend( {

    assessmentsCollection: undefined,
    comparisonsCollection: undefined,

    contextEvents: {
        "comparisons:unfinished:confirmed": "comparisonCompletionConfirmed",
        "comparisons:continue:confirmed": "comparisonContinuationConfirmed",
        "assessments:selection:completed": "assessmentSelectionCompleted",
        "assess:ui:rendered": "start",
        'assess:ui:destroyed': function(){
            this.assessmentsCollection.deselect();
        },
    },

    initialize: function(){
        debug( '#initialize' );
    },

    teardown: function(){
        debug( "#teardown" );
    },

    start: function(){
        this.retrieveComparisons();
        // this.checkIncompleteComparisonsExist();
    },

    retrieveComparisons: function(){
        var collection = this.comparisonsCollection;
        collection.once( "sync", function(){
            this.checkIncompleteComparisonsExist();
        }, this );
        collection.fetch();
    },

    checkIncompleteComparisonsExist: function checkIncompleteComparisonsExist(){
        debug( "#checkIncompleteComparisonsExist" );
        if( this.comparisonsCollection.hasActives() ){
            this.requestComparisonCompletion();
        } else {
            this.checkAssessmentIsSelected();
        }
    },

    checkAssessmentIsSelected: function(){
        if( this.assessmentsCollection.hasSelected() ){
            this.checkSelectedAssessmentIsCompleted();
        } else {
            this.requestAssessmentSelection();
        }
    },

    checkSelectedAssessmentIsCompleted: function(){
        var assessment = this.assessmentsCollection.selected;
        if( assessment.maxComparisonsDone() ){
            this.assessmentsCollection.deselect( assessment );
            this.requestAssessmentSelection();
            this.dispatch( 'assess:show:messages', {
                type: i18n.t( "assess:assessment_completed.type" ) || "success",
                title: i18n.t( "assess:assessment_completed.title" ) || '',
                message: i18n.t( "assess:assessment_completed.description", { title: assessment.get( 'title' ) } )
            } );
        } else {
            this.requestComparisonContinuation();
        }
    },

    requestComparisonCompletion: function(){
        this.dispatch( 'comparisons:unfinished:requested' );
    },
    comparisonCompletionConfirmed: function(){
        this.startComparing();
    },

    requestAssessmentSelection: function(){
        this.dispatch( 'assessments:selection:requested' );
        // var actives = this.assessmentsCollection.getActives();
        // if( actives.length === 1 ){
        //     this.assessmentsCollection.select( actives[ 0 ] );
        //     this.assessmentSelectionCompleted();
        // } else {
        //     this.dispatch( 'assessments:selection:requested' );
        // }
    },
    assessmentSelectionCompleted: function(){
        debug( '#assessmentSelectionCompleted' );
        this.requestComparisonCreation();
    },

    requestComparisonContinuation: function(){
        this.dispatch( 'comparisons:continue:requested' );
    },
    comparisonContinuationConfirmed: function(){
        this.requestComparisonCreation()
    },

    requestComparisonCreation: function(){
        var assessment = this.assessmentsCollection.selected;
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
            this.comparisonsCollection.remove( comparison );
            this.dispatch( 'comparisons:creation:failed', {
                messages: messages,
                assessment: this.assessmentsCollection.selected
            } );
        } else {
            this.startComparing();
        }
    },

    startComparing: function startComparing(){
        debug( "#startComparing" );

        var comparison = this.comparisonsCollection.at( 0 );
        comparison.once( "change:completed", this.finalizeComparison, this );
        this.assessmentsCollection.selectByID( comparison.get( "assessment" ) ); //assessment MUST be selected first!
        this.comparisonsCollection.select( comparison );

        this.dispatch( 'comparisons:editing:requested' );
    },

    finalizeComparison: function(){
        var comparison = this.comparisonsCollection.selected;
        this.comparisonsCollection.deselect( comparison );
        this.comparisonsCollection.remove( comparison );
        var assessment = this.assessmentsCollection.selected;
        assessment.incCompleted();
        if( assessment.maxComparisonsDone() ){
            this.assessmentsCollection.deselect( assessment );
            this.dispatch( 'assess:show:messages', {
                type: i18n.t( "assess:assessment_completed.type" ) || "success",
                title: i18n.t( "assess:assessment_completed.title" ) || '',
                message: i18n.t( "assess:assessment_completed.description", { title: assessment.get( 'title' ) } )
            } );
        }
        this.dispatch( 'comparisons:editing:completed' );
        this.checkIncompleteComparisonsExist();
    }
} );

