'use strict';
const debug = require( 'debug' )( 'dpac:assess.controllers', '[ComparisonFlow]' );
const { Controller } = require( 'backbone.marionette' );
const { clone } = require( 'lodash' );
const { t } = require( 'i18next' );

module.exports = Controller.extend( {

    comparisonsCollection: undefined,
    assessmentsCollection: undefined,

    contextEvents: {
        "assessments:selection:completed": "checkUnfinishedComparisons",
        "assess:ui:rendered": "fetchComparisons",
        "comparison:stop:requested": "requestAssessmentSelection"
    },

    initialize(){
        debug( '#initialize' );
        this.fetchComparisons();
    },

    fetchComparisons(){
        this.comparisonsCollection.once( 'sync', ()=>{
            this.requestAssessmentSelection()
        } );
        this.comparisonsCollection.fetch();
    },

    requestAssessmentSelection(){
        debug( '#requestAssessmentSelection' );
        this.dispatch( 'assess:url:requested', { url: "/assess" } );
        this.dispatch( 'assessments:selection:requested' );
    },

    checkUnfinishedComparisons( assessment ){
        debug( '#checkUnfinishedComparisons', assessment.id );
        this.dispatch( 'assess:url:requested', { url: "/comparison" } );
        const unfinished = this.comparisonsCollection.getActivesFor( { assessment: assessment.id } );
        if( unfinished.length ){
            this.startComparing( unfinished[ 0 ] );
        } else {
            //request creation
            this.requestNewComparison();
        }
    },

    startComparing( comparison ){
        comparison.once( "change:completed", this.comparisonFinished, this );
        this.comparisonsCollection.select( comparison );
        this.dispatch( 'comparisons:editing:requested' );
    },

    comparisonFinished(){
        this.dispatch( 'comparisons:editing:completed' );
        const comparison = this.comparisonsCollection.selected;
        this.comparisonsCollection.deselect( comparison );
        this.comparisonsCollection.remove( comparison );
        const assessment = this.assessmentsCollection.selected;
        assessment.incCompleted();
        if( assessment.isCompleted() ){
            this.assessmentsCollection.deselect( assessment );
            this.requestAssessmentSelection();
            this.dispatch( 'assess:show:messages', {
                type: t( "assess:assessment_completed.type" ) || "success",
                title: t( "assess:assessment_completed.title" ) || '',
                message: t( "assess:assessment_completed.description", { title: assessment.get( 'title' ) } )
            } );
        } else {
            this.requestNewComparison();
        }
    },

    requestNewComparison(){
        const assessment = this.assessmentsCollection.selected;
        debug( '#requestNewComparison', assessment );

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
            this.startComparing( comparison );
        }
    },

} );
