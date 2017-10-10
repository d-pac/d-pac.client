'use strict';

const {reduce, groupBy} = require('lodash');
const {ItemView} = require('backbone.marionette');
const i18n = require( 'i18next' );

const debug = require('debug')('dpac:results.views', '[FeedbackOverview]');
const tpl = require('./templates/RankingFeedback.hbs');

module.exports = ItemView.extend({
    className: "column col-sm-12",
    template: tpl,

    initialize: function () {
        debug('#initialize');
    },

    serializeData: function () {
        const list = this.collection.toJSON().map(function (feedback) {
            feedback.anon = feedback.author.substr(feedback.author.length - 4);
            return feedback;
        });
        const byPhase = reduce(groupBy(list, 'phase'), function (memo, singleGroup, groupName) {
            memo.push({
                phase: {
                    slug: groupName,
                    texts: i18n.t( "assess:phase_" + groupName, { returnObjectTrees: true } )
                },
                items: singleGroup
            });
            return memo;
        }, []);
        return {
            feedback: byPhase,
            representation: this.representations.selected.toJSON()
        };
    }
});
