'use strict';
const {find, defaults} = require('lodash');
const {Model} = require('backbone');
const debug = require('debug')('dpac:assess.models', '[ComparisonFacade]');

module.exports = Model.extend({
    comparisonsCollection: undefined,
    assessmentsCollection: undefined,
    representationsCollection: undefined,
    notesCollection: undefined,
    feedbackCollection: undefined,
    phasesCollection: undefined,

    initialize (){
        this.assessmentsCollection.on('change:selected', this._updateState, this);
        this.comparisonsCollection.on('change:selected', this._updateState, this);
        this.comparisonsCollection.on('change:phase', this._updateState, this);

        this.comparisonsCollection.on('change:completed', (comparison)=>{
            this.comparisonsCollection.deselect(comparison);
            this.comparisonsCollection.remove(comparison);
            this.getAssessment().incCompleted();
        }, this);

        this.assessmentsCollection.on('change:completed', (assessment)=>{
            this.assessmentsCollection.deselect(assessment);
        }, this);
    },

    clear() {
        this.assessmentsCollection.off(null, null, this);
        this.comparisonsCollection.off(null, null, this);
    },

    fetch (){
        this.comparisonsCollection.fetch({reset: true, success: () => this._updateState()});
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
        const currentPhaseSlug = this.getPhase().get('slug');
        const update = {
            data: this.getComparison().get('data') || {},
            phase: this.getAssessment().getNextPhaseId(this.getPhase().id)
        };
        update.data[currentPhaseSlug] = value;
        if (!update.phase) {
            update.completed = true;
        }
        this.getComparison().update(update);
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
