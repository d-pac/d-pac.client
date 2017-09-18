'use strict';
const {get: _get} = require('lodash');
const {Model} = require('backbone');
const debug = require('debug')('dpac:results.controllers', '[StatsController]');
const StatModel = require('../models/StatProxy');
const selectable = require('../../common/mixins/selectable');

module.exports = Model.extend({

    getAssessment(){
        return _get(this.selected, ["assessment"]);
    },
    getStats(){
        const results = _get(this.selected, ["results"]);
        return (results) ? results.get('stats') : {};
    },

    fetchForAssessment(assessment) {
        const model = new StatModel({assessment: assessment.id});
        this.select({assessment: assessment, results: model});
        model.fetch({success: () => this.trigger('sync')})
    },

    toJSON() {
        return {
            assessment: this.selected.assessment.toJSON(),
            results: this.selected.results.toJSON()
        }
    }
});

selectable.mixin(module.exports);
