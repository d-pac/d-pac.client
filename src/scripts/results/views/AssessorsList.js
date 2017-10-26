'use strict';

const {ItemView} = require('backbone.marionette');

const debug = require('debug')('dpac:results.views', '[AssessorsList]');
const tpl = require('./templates/AssessorsList.hbs');

module.exports = ItemView.extend({
    template: tpl,

    modelEvents: {
        'sync': 'render'
    },

    initialize: function () {
        debug('#initialize');
    },

    serializeData: function () {
        debug('#serializeData');
        const assessors = this.model.get('assessors');
        const assessment = this.model.get('assessment');
        return {
            assessors: assessors,
            maxComparisons: assessment.limits.comparisonsNum.perAssessor
        };
    }
});
