'use strict';
const {Model} = require('backbone');
const {defaults}=require('lodash');

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
            const data = this.collection.parser.parseModel(raw);
            console.log(data);
            return data;
        }

        //model already removed from collection
        return raw.data;
    },

    update: function (attrs, opts) {
        this.save(attrs, defaults({patch: true, wait: false}, opts));
    },

    hasMessages: function () {
        const messages = this.get('messages');
        return !!messages && !!messages.length;
    }

});
teardown.model.mixin(module.exports);
