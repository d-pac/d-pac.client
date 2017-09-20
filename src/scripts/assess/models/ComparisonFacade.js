'use strict';
const {find, defaults} = require('lodash');
const {Model} = require('backbone');
const debug = require('debug')('dpac:assess.models', '[ComparisonFacade]');
const {t} = require('i18next');

module.exports = Model.extend({
    comparisonsCollection: undefined,
    assessmentsCollection: undefined,
    representationsCollection: undefined,
    notesCollection: undefined,
    feedbackCollection: undefined,
    phasesCollection: undefined,

    initialize (){
        debug('#initialize');
        this.assessmentsCollection.on('change:selected', ()=>{
            debug('on assessmentsCollection.change:selected');
            this._updateState();
        }, this);
        this.comparisonsCollection.UID = Date.now();
        console.log('set listener on comparisonsCollection', this.comparisonsCollection);
        this.comparisonsCollection.on('change:selected', ()=>{
            const comparison = this.getComparison();
            if(comparison){
                console.log('SETTING PHASE CHANGE LISTENER', comparison);
                comparison.once('change:phase', ()=>{
                    console.log('PHASE CHANGED', comparison);
                })
            }
            debug('on comparisonsCollection.change:selected', comparison);
            this._updateState();
        }, this);
        // this.comparisonsCollection.on('change:phase', ()=>{
        //     debug('on comparisonsCollection.change:phase');
        //     this._updateState();
        // }, this);
        //
        // this.comparisonsCollection.on('change', (...args)=>{
        //     debug('on comparisonsCollection.change', args);
        // });
        //
        // this.comparisonsCollection.on('change:completed', (comparison)=>{
        //     debug('on comparisonsCollection.change:completed');
        //     this.comparisonsCollection.deselect(comparison);
        //     this.comparisonsCollection.remove(comparison);
        //     this.getAssessment().incCompleted();
        // }, this);

        this.assessmentsCollection.on('change:completed', (assessment)=>{
            debug('on assessments.change:completed');
            this.assessmentsCollection.deselect(assessment);
        }, this);
        this.comparisonsCollection.fetch({reset: true, success: () => {
            debug('on comparisonsCollection.fetch', this.getComparison());
            this._updateState();
        }});
    },

    clear() {
        debug('#clear');
        this.assessmentsCollection.off(null, null, this);
        this.comparisonsCollection.off(null, null, this);
    },

    _updateState() {
        debug('#_updateState');

        const assessment = this.getAssessment();
        if(assessment){
            const assessmentPhases = assessment.get('phases');
            const comparison = this.getComparison();
            if(comparison){
                let currentPhaseId = comparison.get('phase');
                let currentPhase = this.phasesCollection.get(currentPhaseId);
                if (!currentPhase) {
                    currentPhase = this.phasesCollection.get(assessmentPhases[0]);
                }
                this.phasesCollection.select(currentPhase);
                const selectedRepId = comparison.get('data').selection;
                this.representationsCollection.selectByID(selectedRepId);
            }
        }
        this.trigger('change:state');
    },

    toJSON (){
        const assessment = this.getAssessment();
        const comparison = this.getComparison();
        const representation = this.getRepresentation();
        const phase = this.getPhase();
        return {
            assessment: assessment ? assessment.toJSON() : null,
            comparison: comparison ? comparison.toJSON() : null,
            representation: representation ? representation.toJSON() : null,
            phase: phase ? phase.toJSON() : null,
        }
    },

    getAssessment (){
        return this.assessmentsCollection.selected;
    },

    getComparison (){
        return this.comparisonsCollection.selected;
    },

    getRepresentation(){
        return this.representationsCollection.selected;
    },

    getPhase(){
        return this.phasesCollection.selected;
    },

    getRepresentationByOrder: function (orderId) {
        const repId = this.getComparison().get("representations")[orderId];
        return this.representationsCollection.get(repId);
    },

    getSelectedRepresentationOrder: function () {
        const selectedRep = this.getRepresentation();
        if (selectedRep) {
            let found;
            find(this.getComparison().get('representations'), function (representationId,
                                                                        order) {
                if (representationId === selectedRep.id) {
                    found = order;
                    return true;
                }
            });
            return found;
        }
        return false;
    },

    getDocumentByOrder: function (orderId) {
        const representation = this.getRepresentationByOrder(orderId);
        return representation.get("document");
    },

    getNoteByOrder: function (orderId) {
        const document = this.getDocumentByOrder(orderId);
        if (document) {
            return this.notesCollection.getNoteByDocId(document._id);
        }
    },

    getFeedbackByOrder: function (order) {
        const representation = this.getRepresentationByOrder(order);
        const currentPhaseSlug = this.getPhase().get('slug');
        if (representation) {
            return this.feedbackCollection.getFeedbackByRepresentationId(representation.id, currentPhaseSlug)
                || this.createFeedback({phase: currentPhaseSlug}, order);
        }
    },

    notesEnabled: function () {
        return this.getAssessment().get('enableNotes');
    },

    storeDataForCurrentPhase: function (value) {
        const comparison = this.getComparison();
        debug('#storeDataForCurrentPhase',this.comparisonsCollection, comparison);
        const currentPhaseSlug = this.getPhase().get('slug');
        const update = {
            data: comparison.get('data') || {},
            phase: this.getAssessment().getNextPhaseId(this.getPhase().id)
        };
        update.data[currentPhaseSlug] = value;
        console.log('Phases', this.getPhase().id, '->', update.phase);
        if (!update.phase) {
            update.completed = true;
        }
        comparison.update(update, {success:()=>{
            if(comparison.get('completed')){
                console.log('callback: COMPLETED');
                this.comparisonsCollection.deselect(comparison);
                this.comparisonsCollection.remove(comparison);
                const assessment = this.getAssessment();
                assessment.incCompleted();
                if( assessment.isCompletedForUser() ){
                    this.assessmentsCollection.deselect( assessment );
                    this.dispatch( 'assess:show:messages', {
                        type: t( "assess:assessment_completed.type" ) || "success",
                        title: t( "assess:assessment_completed.title" ) || '',
                        message: t( "assess:assessment_completed.description", { title: assessment.get( 'title' ) } )
                    } );
                }
                this._updateState();

            }else{
                console.log('callback: NOT COMPLETED');
            }
            this._updateState();
        }});
    },

    storeFeedback: function (feedback) {
        if (feedback.a.positive || feedback.a.negative) {
            this.getFeedbackByOrder('a').update({
                positive: feedback.a.positive,
                negative: feedback.a.negative
            });
        }

        if (feedback.b.positive || feedback.b.negative) {
            this.getFeedbackByOrder('b').update({
                positive: feedback.b.positive,
                negative: feedback.b.negative
            });
        }
        this.storeDataForCurrentPhase({
            aPositive: feedback.a.positive,
            aNegative: feedback.a.negative,
            bPositive: feedback.b.positive,
            bNegative: feedback.b.negative
        });
    },

    createFeedback: function (feedback,
                              order) {
        defaults(feedback, {
            author: this.getComparison().get('assessor'),
            representation: this.getRepresentationByOrder(order).id
        });
        return this.feedbackCollection.add(feedback);
    },

    createNote: function (noteData,
                          order) {
        defaults(noteData, {
            author: this.getComparison().get('assessor'),
            document: this.getDocumentByOrder(order)._id
        });
        return this.notesCollection.create(noteData);
    }
});
