'use strict';
const {get: _get, kebabCase, each: _each, chain: _chain} = require('lodash');
const P = require('bluebird');

const {Model} = require('backbone');
const debug = require('debug')('dpac:results.vm', '[ResultsVM]');
const StatModel = require('../models/StatProxy');

module.exports = Model.extend({
    authorization: undefined,
    representations: undefined,
    users: undefined,

    _parsed: false,

    defaults: {
        assessment: undefined,
        ranking: undefined,
        representations: undefined,
        assessors: undefined,
        stats: undefined
    },

    initialize: function () {
        debug('#initialize');
    },

    _fetchStatsForAssessment(assessment) {
        debug('#_fetchStatsForAssessment');
        this.stats = new StatModel({assessment: assessment.id});
        return new P((resolve, reject) => {
            this.stats.fetch({
                success: resolve,
                error: reject
            });
        });
    },
    _fetchRepresentationsForAssessment(assessment) {
        debug('#_fetchRepresentationForAssessment');
        return new P((resolve, reject) => {
            this.representations.fetchForAssessment(assessment, {
                success: resolve,
                error: reject
            });
        });
    },

    _fetchAssessorsForAssessment(assessment) {
        return new P((resolve, reject) => {
            this.users.fetchAssessors(assessment, {
                success: resolve,
                error: reject
            });
        });
    },

    fetchResultsForAssessment(assessment) {
        this.cache = null;
        this.clear();
        P.props({
            stats: this._fetchStatsForAssessment(assessment),
            representations: this._fetchRepresentationsForAssessment(assessment),
            assessors: this._fetchAssessorsForAssessment(assessment)
        })
            .then(() => this.parseData(assessment))
        ;
    },

    parseData(assessment) {
        debug('#parseData', assessment);
        this.set({
            assessment: assessment.toJSON(),
                nav: {
                showRanking: this.authorization.isAllowedToViewRanking(assessment),
                showAssessors: this.authorization.isAllowedToViewAssessorsList(assessment),
                showRepresentations: this.authorization.isAllowedToViewRepresentationsList(assessment),
            }
        });
        _each(this.stats.get('stats.byRepresentation'), (v, k) => {
            this.representations.get(k).set({
                completedComparisons: v.comparisonsNum,
                infit: v.infit
            });
        });

        const maxComparisons = assessment.get('limits.comparisonsNum.perAssessor');
        _each(this.stats.get('stats.byAssessor'), (v, k) => {
            this.users.get(k).set({
                completedComparisons: v.comparisonsNum,
                infit: v.infit,
                hasCompleted: v.comparisonsNum >= maxComparisons
            });
        });

        const isAllowedToViewOthers = this.authorization.isAllowedToViewOthers(assessment);
        const user = this.authorization.getUser();
        const n = this.representations.length;
        let i = 0;
        const ownedRepresentations = [];
        const ranking = this.representations
            .sortBy((model) => model.get('ability.value') || 0)
            .map((model) => {
                i++;
                const ability = Number(model.get('ability.value'));
                const rse = Number(model.get('ability.se'));
                const se = Math.min(rse, 3);
                model.set({rank: n - i + 1});
                const owned = model.isOwnedBy(user);
                if (owned) {
                    ownedRepresentations.push(model);
                }

                return Object.assign(model.toJSON(), {
                    ability: ability,
                    se: se,
                    rse: rse,
                    x: i,
                    y: ability,
                    id: model.id,
                    classes: ['representation-' + kebabCase(model.get('rankType'))],
                    emphasis: owned,
                    selectable: owned || isAllowedToViewOthers
                });
            });
        if (ownedRepresentations.length) {
            const representation = ownedRepresentations[ownedRepresentations.length - 1];
            this.selectRepresentation(representation.id, true);
        }
        this.set({
            ranking: ranking,
            representations: this.representations.toJSON(),
            assessors: this.users.toJSON(),
            results: this.stats.toJSON(),
        });
    },

    selectRepresentation(id, internal) {
        const model = this.representations.selectByID(id);
        if (model) {
            this.dispatch("results:representation:selected", {
                representation: model,
                triggeredByUser: !internal
            });
        }
        return model;
    },

    getSelectedRepresentationId() {
        return _get(this.representations, ['selected', 'id']);
    },

    getRepresentationsLength() {
        return this.representations.length;
    },

})
;
