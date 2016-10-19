'use strict';
const {Model} = require('backbone');

const debug = require('debug')('dpac:assess.models', '[ComparisonProxy]');

const teardown = require('../../common/mixins/teardown');

module.exports = Model.extend({

    urlRoot: '/comparisons',
    idAttribute: "_id",
    defaults: {
        /**
         * {Assessment.id}
         */
        assessment: undefined,
        /**
         * {User.id}
         */
        assessor: undefined,
        /**
         * {Phase.id}
         */
        phase: undefined,

        /**
         * {Boolean}
         */
        completed: false,

        representations: undefined,
        data: undefined,
        messages: undefined
    },

    initialize: function () {
        debug('#initialize', this.id || '<new>');
    },

    parse: function (raw) {
        debug("#parse", this, raw);
        if (this.collection) {
            return this.collection.parser.parseModel(raw);
        }

        //model already removed from collection
        return raw.data;
    },

    update: function (attrs) {
        this.save(attrs, {patch: true, wait: true});
    },

    hasMessages: function () {
        const messages = this.get('messages');
        return !!messages && !!messages.length;
    }

});
teardown.model.mixin(module.exports);
