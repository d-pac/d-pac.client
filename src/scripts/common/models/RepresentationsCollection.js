'use strict';
const {Collection} = require('backbone');
const debug = require('debug')('dpac:common.collections', '[RepresentationsCollection]');
const teardown = require('../../common/mixins/teardown');
const selectable = require('../../common/mixins/selectable');
const ModelClass = require('../models/RepresentationProxy');

module.exports = Collection.extend({
    url: '/representations',
    model: ModelClass,

    initialize: function (models) {
        debug('#initialize');
    },

    parse: function (raw) {
        return raw.data;
    },

    fetchForAssessment: function (model, opts = {}) {
        debug('#fetchForAssessment');
        this.fetch(Object.assign({
            data: {filter: JSON.stringify({assessment: model.id})},
            reset: true
        }, opts));
    },

    fetchForUser: function () {
        debug('#fetchForUser');
        this.fetch({
            url: '/user/representations',
            reset: true
        });
    }

});
teardown.collection.mixin(module.exports);
selectable.mixin(module.exports);
