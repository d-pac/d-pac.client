'use strict';
const debug = require( 'debug' )( 'dpac:assess.controllers', '[AssessFlow]' );
const {clone} = require( 'lodash' );
const {Controller} = require( 'backbone.marionette' );
const {t} = require( 'i18next' );
module.exports = Controller.extend( {

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
        const collection = this.comparisonsCollection;
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
        const assessment = this.assessmentsCollection.selected;
        if( assessment.isCompleted() ){
            this.assessmentsCollection.deselect( assessment );
            this.requestAssessmentSelection();
            this.dispatch( 'assess:show:messages', {
                type: t( "assess:assessment_completed.type" ) || "success",
                title: t( "assess:assessment_completed.title" ) || '',
                message: t( "assess:assessment_completed.description", { title: assessment.get( 'title' ) } )
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
        // const actives = this.assessmentsCollection.getActives();
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
        this.requestComparisonCreation();
    },

    requestComparisonCreation: function(){
        const assessment = this.assessmentsCollection.selected;
        debug( '#requestComparisonCreation', assessment );

        this.comparisonsCollection.once( "add", this.comparisonCreationCompleted, this );
        this.comparisonsCollection.create( {
            assessment: assessment.id
        }, { wait: true } );
    },
    comparisonCreationCompleted: function( comparison ){
        debug( '#comparisonCreationCompleted', comparison );

        if( comparison.hasMessages() ){
            const messages = clone( comparison.get( 'messages' ) );
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

        const comparison = this.comparisonsCollection.at( 0 );
        comparison.once( "change:completed", this.finalizeComparison, this );
        this.assessmentsCollection.selectByID( comparison.get( "assessment" ) ); //assessment MUST be selected first!
        this.comparisonsCollection.select( comparison );

        this.dispatch( 'comparisons:editing:requested' );
    },

    finalizeComparison: function(){
        const comparison = this.comparisonsCollection.selected;
        this.comparisonsCollection.deselect( comparison );
        this.comparisonsCollection.remove( comparison );
        const assessment = this.assessmentsCollection.selected;
        assessment.incCompleted();
        if( assessment.isCompleted() ){
            this.assessmentsCollection.deselect( assessment );
            this.dispatch( 'assess:show:messages', {
                type: t( "assess:assessment_completed.type" ) || "success",
                title: t( "assess:assessment_completed.title" ) || '',
                message: t( "assess:assessment_completed.description", { title: assessment.get( 'title' ) } )
            } );
        }
        this.dispatch( 'comparisons:editing:completed' );
        this.checkIncompleteComparisonsExist();
    }
} );

