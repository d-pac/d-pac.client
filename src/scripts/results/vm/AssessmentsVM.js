'use strict';
const {Controller} = require('backbone.marionette');
const debug = require('debug')('dpac:results.vm', '[AssessmentsVM]');

module.exports = Controller.extend({

    assessmentsCollection: undefined,
    accountModel: undefined,

    getSelected() {
        return  (this.assessmentsCollection) ? this.assessmentsCollection.selected : null;
    },

    initialize() {

        this.assessmentsCollection.on('change:selected', () => {
            const model = this.assessmentsCollection.selected;
            this.dispatch("results:assessment:selected", {assessment: model});
        });
        const pamAssessments = this.accountModel.getAssessments('PAM');
        const assessments = this.assessmentsCollection.listById(this.accountModel.getAssessments('PAM'))
        assessments.forEach((model) => {
            model.set('permissions.results', true);
            return model;
        });
        //we want all the assessments the assessor/assessee is or will (!) be allowed to see
        const restricted = this.assessmentsCollection.listById([
            ...this.accountModel.getAssessments('assessor'),
            ...this.accountModel.getAssessments('assessee')
        ])
            .filter((assessment) => assessment.get('feature.results.enabled'));
        assessments.add(restricted);

        this.filtered = assessments;
    },

    toJSON() {
        return this.filtered.toJSON();
    },

    select(model) {
        return this.assessmentsCollection.select(model);
    },

    deselect(model) {
        return this.assessmentsCollection.deselect(model);
    },

    selectByID(id) {
        return this.assessmentsCollection.selectByID(id);
    }
});
