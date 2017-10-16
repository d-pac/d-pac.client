'use strict';
const {extend} = require('lodash');

const debug = require('debug')('dpac:results.controllers', '[BootstrapModule]');
const instruct = require('backbone.whenthen');

module.exports = function BootstrapModule() {
    // constructor
};

extend(module.exports.prototype, {
    execute: function () {
        debug('#execute');
        const context = this.context;
        const assessmentsFacade = context.getObject('assessmentsFacade');

        context.wireCommands({
            'results:bootstrap:requested': [
                require('./BootstrapDomain'),
            ],
            'results:ui:requested': [
                require('./../../common/controllers/SetupAssessmentI18NSyncing'),
                require('./BootstrapUI')
            ],
            'results:assessment:selected': [require('./LoadResults')],
            "results:representation:selected": [require('./LoadFeedback')]
        });

        const instructor = instruct(this.context.vent);
        instructor
            .when('results:bootstrap:requested')
            .then(function () {
                assessmentsFacade.fetch();
            })
            .when('assessments:collection:sync')
            .then(function () {
                context.wireValue('assessmentsCollection', assessmentsFacade);
            }, 'results:ui:requested', 'results:bootstrap:completed')
            .when('results:bootstrap:completed')
            .then(function () {
                instructor.destroy();
            });

        //set off bootstrapping
        context.vent.trigger('results:bootstrap:requested');
    }
});
