'use strict';
const {get, set, isObject, isString} = require('lodash');
const NestedModel = require('backbone-nested-model');
const debug = require('debug')('dpac:core.models', '[AssessmentProxy]');
const teardown = require('../../common/mixins/teardown');
const moment = require('moment');

function featureIsEnabled(feature, disable) {
    const now = moment();
    if (!feature.enabled) {
        return false;
    }

    if (!moment(feature.begin).isBefore(now)) {
        return false;
    }

    if (feature.end) {
        return now.isBefore(moment(feature.end));
    }
    return !disable;
}


module.exports = NestedModel.extend({
    idAttribute: "_id",

    defaults: {
        title: undefined,
        assignments: {
            assessor: undefined,
            assessee: undefined
        },
        state: undefined,
        phases: [],
        parent: undefined,
        uiCopy: undefined,
        enableTimeLogging: false,
        enableNotes: false,
        enableSelectionIcon: true,
        progress: {
            total: undefined,
            completedNum: undefined, //number of comparisons the user has already made for this assessment
            current: undefined
        },
        // results: {
        //     enable: true,
        //     assessees: {
        //         viewRepresentations: true,
        //         viewRanking: true
        //     }
        // },
        permissions: {
            uploads: false,
            comparisons: false,
            results: false
        },
        hasResults: false
    },

    initialize: function () {
        debug('#initialize', this.id || '<new>');
        this.on('change:progress.completedNum', this.updateCurrentProgressValue, this);
        this.updateCurrentProgressValue();
    },

    updateCurrentProgressValue(){
        debug('#updateCurrentProgressValue');
        this.set('progress.current', this.get('progress.completedNum') + 1)
    },

    parse: function (raw) {
        console.log('ASsesssmentProxy#parse', raw);
        if(raw.data){ //direct call, not parsed in collection
            raw = raw.data;
        }
        raw.uiCopy = JSON.parse(raw.uiCopy);

        set(raw, ["progress", "current"], get(raw, ["progress", "completedNum"], 0) + 1);

        set(raw, ["permissions", "results"], featureIsEnabled(get(raw, ["feature", "results"], {})));
        set(raw, ["permissions", "comparisons"], featureIsEnabled(get(raw, ["feature", "comparisons"], {}), raw.permissions.results));
        set(raw, ["permissions", "uploads"], featureIsEnabled(get(raw, ["feature", "uploads"], {}), raw.permissions.comparisons || raw.permissions.results));

        //if the date doesn't fall between the begin and end dates we want to show that results will be available
        //but you shouldn't be able view them yet.
        raw.hasResults = (raw.hasCalculations && raw.permissions.results);

        return raw;
    },

    getNextPhaseId: function (phaseId) {
        const phases = this.get('phases');
        const index = phases.indexOf(phaseId) + 1;
        return phases[index];
    },

    isRoot: function () {
        return !this.get("parent");
    },

    incCompleted: function () {
        this.set('progress.completedNum', this.get('progress.completedNum') + 1);
    },

    isCompletedForUser: function () {
        return this.get('state') === 'completed'
            || this.get('progress').completedNum >= this.get('progress').total;
    },

    isActive: function () {
        return !this.isCompletedForUser() && this.get('state') === 'active';
    },

    assessingAllowed: function () {
        return this.isActive() && (this.isRoot() || !this.parentIsActive()) && this.get('permissions.comparisons');
    },

    uploadingAllowed: function (override) {
        // we only want to exclude the ones that are really disabled, not those where the date doesn't fall between begin and end
        console.log("uploads allowed", this.get('permissions.uploads'), !override);
        return this.get('permissions.uploads') || (!override && this.assessingAllowed());
    },

    resultsAllowed: function () {
        // we only want to exclude the ones that are really disabled, not where the date doesn't fall between begin and end
        // unless if the end date has been reached already
        const end = this.get('feature.results.end');
        let allow = (end) ? moment().isBefore(moment(end)) : true;

        return this.get('feature.results.enabled') && allow;
    },

    getParent: function () {
        return this.get('registry').get(this.get('parent'));
    },

    parentIsActive: function () {
        const parentModel = this.getParent();
        if (!parentModel) {
            // most probably this assessment was added to the user, but not it's parent model,
            // i.e. bad config of the assessment.
            return true;
        }
        return parentModel.isActive();
    },

    refresh(){
        this.fetch();
    },

    onTeardown: function () {
        debug("#teardown");
    }
});
teardown.model.mixin(module.exports);
