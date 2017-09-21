'use strict';
const debug = require('debug')('dpac:assess.controllers', '[ComparisonFlow]');
const {Controller} = require('backbone.marionette');
const {clone} = require('lodash');
const {t} = require('i18next');
let counter = 0;

module.exports = Controller.extend({

    currentSelection: undefined,

    contextEvents: {
        "comparison:stop:requested": "comparisonInterrupted",
        "assess:ui:rendered": "start",
        "assess:ui:destroyed": "clear",
    },

    initialize(){
        debug('#initialize');
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
        // DO NOT REMOVE THIS FUNCTION                            //
        // FOR SOME GODAWFUL REASON TWO INSTANCES WILL BE CREATED //
        // IF YOU OMIT THIS FUNCTION                              //
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
    },

    start: function () {
        debug('#start');
        this.currentSelection.on('change:state', () => this.determineState(), this);
        this.determineState();
    },

    clear: function () {
        debug('#clear');
        this.currentSelection.off(null, null, this);
    },

    determineState(){
        debug('#determineState');
        const selectedAssessment = this.currentSelection.getAssessment();
        if (selectedAssessment) {
            const selectedComparison = this.currentSelection.getComparison();
            if (selectedComparison) {
                this.requestComparisonEdit();
            } else {
                const unfinishedComparisons = this.currentSelection.comparisonsCollection.getActivesFor({assessment: selectedAssessment.id});
                if (unfinishedComparisons.length > 0) {
                    this.currentSelection.comparisonsCollection.select(unfinishedComparisons[0]);
                    this.requestComparisonEdit();
                } else {
                    this.requestNewComparison();
                }
            }
        } else {
            this.requestAssessmentSelection();
        }
    },

    requestComparisonEdit(){
        debug('#requestComparisonEdit');
        this.dispatch('comparisons:editing:requested');
    },

    requestAssessmentSelection(){
        debug('#requestAssessmentSelection');
        this.dispatch('assess:url:requested', {url: "/assess"});
        this.dispatch('assessments:selection:requested');
    },

    requestNewComparison(){
        const assessment = this.currentSelection.getAssessment();
        debug('#requestNewComparison', assessment);

        this.currentSelection.comparisonsCollection.create({
            assessment: assessment.id
        }, {
            wait: true,
            success: (comparison) => {
                debug('comparisonscollection add handler');
                if (comparison.hasMessages()) {
                    const messages = clone(comparison.get('messages'));
                    this.currentSelection.comparisonsCollection.remove(comparison);
                    this.dispatch('comparisons:creation:failed', {
                        messages: messages,
                        assessment: this.currentSelection.getAssessment()
                    });
                }
                this.determineState();
            }
        });
    },

    // comparisonFinished(){
    //     debug('#comparisonFinished');
    //     this.dispatch('comparisons:editing:completed');
    //     if (assessment.isCompletedForUser()) {
    //         this.dispatch('assess:show:messages', {
    //             type: t("assess:assessment_completed.type") || "success",
    //             title: t("assess:assessment_completed.title") || '',
    //             message: t("assess:assessment_completed.description", {title: assessment.get('title')})
    //         });
    //     }
    //     this.determineState();
    // },

    comparisonInterrupted(){
        debug('#comparisonInterrupted');
        this.currentSelection.comparisonsCollection.deselect(this.currentSelection.getComparison());
        this.currentSelection.assessmentsCollection.deselect(this.currentSelection.getAssessment());
    },

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

});
