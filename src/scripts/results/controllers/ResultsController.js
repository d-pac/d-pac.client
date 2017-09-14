'use strict';
const {Controller} = require('backbone.marionette');
const debug = require('debug')('dpac:results.controllers', '[ResultsController]');

module.exports = Controller.extend({

    assessmentsCollection: undefined,
    accountModel: undefined,

    get selected(){
        return (this.assessmentsCollection) ? this.assessmentsCollection.selected : null;
    },

    initialize() {
        const pamAssessments = this.accountModel.getAssessments('PAM');
        const assessments = this.assessmentsCollection.listById(this.accountModel.getAssessments('PAM'))
        assessments.forEach((model)=>{
            model.set('permissions.results', true);
            return model;
        });
        //we want all the assessments the assessor/assessee is or will (!) be allowed to see
        const restricted = this.assessmentsCollection.listById([
                ...this.accountModel.getAssessments('assessor'),
                ...this.accountModel.getAssessments('assessee')
            ])
                .filter((assessment) => {
                    return assessment.get('feature.results.enabled');
                });
        assessments.add(restricted);

        this.filtered = assessments;
    },

    toJSON() {
        return this.filtered.toJSON();
    },

    select(model){
        return this.assessmentsCollection.select(model);
    },

    deselect(model){
        return this.assessmentsCollection.deselect(model);
    },

    selectByID(id){
        return this.assessmentsCollection.selectByID(id);
    }
});
