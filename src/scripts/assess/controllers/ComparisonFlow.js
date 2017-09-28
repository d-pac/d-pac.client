'use strict';
const debug = require( 'debug' )( 'dpac:assess.controllers', '[ComparisonFlow]' );
const { Controller } = require( 'backbone.marionette' );
const { clone } = require( 'lodash' );
const { t } = require( 'i18next' );

module.exports = Controller.extend( {

    comparisonsCollection: undefined,
    assessmentsCollection: undefined,

    contextEvents: {
        "assess:ui:rendered": "determineState",
        "assessments:selection:completed": function(){
            debug('assessments:selection:completed handler');
            this.determineState();
        },
        "comparison:stop:requested": "comparisonInterrupted"
    },

    initialize: function(){
        this.comparisonsCollection.once( 'sync', ()=>{
            debug('comparisonscollection sync handler');
            this.determineState();
        });
        this.comparisonsCollection.fetch({reset:true});
    },

    determineState(){
        debug( '#determineState' );
        const selectedAssessment = this.assessmentsCollection.selected;
        if( selectedAssessment ){
            const selectedComparison = this.comparisonsCollection.selected;
            if(selectedComparison){
                this.requestComparisonEdit();
            }else{
                const unfinishedComparisons = this.comparisonsCollection.getActivesFor( { assessment: selectedAssessment.id } );
                if(unfinishedComparisons.length > 0){
                    this.comparisonsCollection.select(unfinishedComparisons[0]);
                    this.requestComparisonEdit();
                }else{
                    this.requestNewComparison();
                }
            }
        }else{
            this.requestAssessmentSelection();
        }
    },

    requestComparisonEdit(){
        const selectedComparison = this.comparisonsCollection.selected;
        selectedComparison.once( "change:completed", this.comparisonFinished, this );
        this.dispatch( 'comparisons:editing:requested' );
    },

    requestAssessmentSelection(){
        debug( '#requestAssessmentSelection' );
        this.dispatch( 'assess:url:requested', { url: "/assess" } );
        this.dispatch( 'assessments:selection:requested' );
    },

    requestNewComparison(){
        const assessment = this.assessmentsCollection.selected;
        debug( '#requestNewComparison', assessment );

        this.comparisonsCollection.once( "add", (comparison)=>{
            debug('comparisonscollection add handler');
            if( comparison.hasMessages() ){
                const messages = clone( comparison.get( 'messages' ) );
                this.comparisonsCollection.remove( comparison );
                this.dispatch( 'comparisons:creation:failed', {
                    messages: messages,
                    assessment: this.assessmentsCollection.selected
                } );
            }
            this.determineState();
        }, this );
        this.comparisonsCollection.create( {
            assessment: assessment.id
        }, { wait: true } );
    },

    comparisonFinished(){
        debug('#comparisonFinished');
        this.dispatch( 'comparisons:editing:completed' );
        const comparison = this.comparisonsCollection.selected;
        this.comparisonsCollection.deselect( comparison );
        this.comparisonsCollection.remove( comparison );
        const assessment = this.assessmentsCollection.selected;
        assessment.incCompleted();
        if( assessment.isCompletedForUser() ){
            this.assessmentsCollection.deselect( assessment );
            this.dispatch( 'assess:show:messages', {
                type: t( "assess:assessment_completed.type" ) || "success",
                title: t( "assess:assessment_completed.title" ) || '',
                message: t( "assess:assessment_completed.description", { title: assessment.get( 'title' ) } )
            } );
        }
        this.determineState();
    },

    comparisonInterrupted(){
        debug('comparisonInterrupted');
        const comparison = this.comparisonsCollection.selected;
        this.comparisonsCollection.deselect( comparison );
        comparison.off(null, null, this);
        this.requestAssessmentSelection();
    }
    //
    //
    //
    //
    //
    // checkUnfinishedComparisons( assessment ){
    //     debug( '#checkUnfinishedComparisons', assessment.id );
    //     this.dispatch( 'assess:url:requested', { url: "/comparison" } );
    //     const unfinished = this.comparisonsCollection.getActivesFor( { assessment: assessment.id } );
    //     if( unfinished.length ){
    //         this.startComparing( unfinished[ 0 ] );
    //     } else {
    //         //request creation
    //         this.requestNewComparison();
    //     }
    // },
    //
    // startComparing( comparison ){
    //     comparison.once( "change:completed", this.comparisonFinished, this );
    //     this.comparisonsCollection.select( comparison );
    //     this.dispatch( 'comparisons:editing:requested' );
    // },
    //
    // comparisonFinished(){
    //     this.dispatch( 'comparisons:editing:completed' );
    //     const comparison = this.comparisonsCollection.selected;
    //     this.comparisonsCollection.deselect( comparison );
    //     this.comparisonsCollection.remove( comparison );
    //     const assessment = this.assessmentsCollection.selected;
    //     assessment.incCompleted();
    //     if( assessment.isCompleted() ){
    //         this.assessmentsCollection.deselect( assessment );
    //         this.requestAssessmentSelection();
    //         this.dispatch( 'assess:show:messages', {
    //             type: t( "assess:assessment_completed.type" ) || "success",
    //             title: t( "assess:assessment_completed.title" ) || '',
    //             message: t( "assess:assessment_completed.description", { title: assessment.get( 'title' ) } )
    //         } );
    //     } else {
    //         this.requestNewComparison();
    //     }
    // },
    //
    //
    // comparisonCreationCompleted: function( comparison ){
    //     debug( '#comparisonCreationCompleted', comparison );
    //
    //     if( comparison.hasMessages() ){
    //         const messages = clone( comparison.get( 'messages' ) );
    //         this.comparisonsCollection.remove( comparison );
    //         this.dispatch( 'comparisons:creation:failed', {
    //             messages: messages,
    //             assessment: this.assessmentsCollection.selected
    //         } );
    //     } else {
    //         this.startComparing( comparison );
    //     }
    // },

} );
