'use strict';
const {Collection} = require('backbone');

const debug = require('debug')('dpac:core.collections', '[AssessmentsCollection]');
const teardown = require('../../common/mixins/teardown');
const selectable = require('../../common/mixins/selectable');
const safeSync = require('../../common/mixins/safeSync');
const propagateEvents = require('../../common/mixins/propagateEvents');

const ModelClass = require('../models/AssessmentProxy');

const AssessmentsCollection = Collection.extend({
    url: '/user/assessments',
    model: ModelClass,

    selected: undefined,

    contextEvents: {
        'assess:teardown:requested': "teardown",
        'authentication:signout:completed': function () {
            this.reset();
        }
    },

    initialize: function (models) {
        debug('#initialize');

    },

    parse: function (raw) {
        const docs = raw.data || [];

        return docs.map((doc) => {
            doc.registry = this;
            return doc;
        });
    },

    fetch: function (...args) {
        debug('#fetch');
        return Collection.prototype.fetch.apply(this, args);
    },

    //==( by role )==/

    listById: function (ids) {
        const models = this.filter(function (model) {
            return ids.indexOf(model.id) >= 0;
        });
        return new AssessmentsCollection(models);
    },

    //==( actives )==//

    filterAssessingAllowed: function () {
        const models = this.filter(function (assessment) {
            return assessment.assessingAllowed();
        });
        return new AssessmentsCollection(models);
    },

    //==( extras )==/

    onTeardown: function () {
        this.deselect();
        this.roles('teardown');
    }
});
module.exports = AssessmentsCollection;

selectable.mixin(module.exports);
propagateEvents.mixin(module.exports).propagate({
    "sync": "assessments:collection:sync"
});
safeSync.collection.mixin(module.exports);
teardown.collection.mixin(module.exports);

