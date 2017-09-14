const NestedModel = require('backbone-nested-model');
const debug = require('debug')('dpac:core.models', '[AssessmentProxy]');
module.exports = NestedModel.extend({
    urlRoot: "/stats",
    idAttribute: "assessment",

    defaults: {
        assessment: undefined,
        lastRun: undefined,
        isUpToDate: false,
        stats: {
            averages: {},
            totals: {}
        }
    },

    parse(raw) {
        console.log('StatProxy#parse', raw);
        if (raw.data) { //direct call, not parsed in collection
            raw = raw.data;
        }
        return raw;
    }
});
