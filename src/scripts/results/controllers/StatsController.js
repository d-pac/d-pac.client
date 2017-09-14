'use strict';
const {Model} = require('backbone');
const debug = require('debug')('dpac:results.controllers', '[StatsController]');
const StatModel = require('../models/StatProxy');
const selectable = require('../../common/mixins/selectable');

module.exports = Model.extend({

    fetchForAssessment(assessment) {
        const model = new StatModel({assessment: assessment.id});
        this.select({assessment: assessment, stats: model});
        model.fetch({success: () => this.trigger('sync')})
    },

    toJSON() {
        return {
            assessment: this.selected.assessment.toJSON(),
            results: this.selected.stats.toJSON()
        }
    }
});

selectable.mixin(module.exports);
