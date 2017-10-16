'use strict';

const {ItemView} = require('backbone.marionette');

const debug = require('debug')('dpac:results.views', '[RepresentationsList]');
const tpl = require('./templates/RepresentationsList.hbs');

module.exports = ItemView.extend({
    template: tpl,

    modelEvents: {
        'sync': 'render'
    },

    initialize: function () {
        debug('#initialize');
    },

    serializeData: function () {
        const representations = this.model.get('ranking');
        return {
            representations: representations.sort((a,b)=>a.rank-b.rank),
            maxComparisons: this.model.get('assessment').limits.comparisonsNum.perRepresentation,
            admin: this.model.get('admin')
        }
    }
});
