'use strict';

const debug = require('debug')('dpac:assess.views', '[MainView]');
const tpl = require('./templates/MainView.hbs');
const {LayoutView} = require('backbone.marionette');
const {Model} = require('backbone');
module.exports = LayoutView.extend({
    template: tpl,
    unfinishedComparisonsFactory: undefined,
    continueComparisonsFactory: undefined,
    assessmentSelectionFactory: undefined,
    layoutFactory: undefined,
    comparisonMessagesFactory: undefined,

    regions: {
        contentRegion: "#assessment-content"
    },

    //avoid the idiotic div-wrapper
    tagName: "div",
    className: "row",

    contextEvents: {
        "comparisons:unfinished:requested": "showUnfinishedComparison",
        "comparisons:continue:requested": "showContinueComparison",
        'comparisons:editing:requested': 'showLayoutView',
        'assessments:selection:requested': 'showAssessmentsSelection',
        'comparisons:creation:failed': 'showComparisonMessage'
    },

    initialize: function () {
        debug("#initialize");
    },

    onRender: function () {
        this.dispatch('assess:ui:rendered');
    },

    showUnfinishedComparison: function () {
        this.contentRegion.show(this.unfinishedComparisonsFactory());
    },

    showContinueComparison: function () {
        this.contentRegion.show(this.continueComparisonsFactory());
    },

    showComparisonMessage: function (event) {
        this.contentRegion.show(this.comparisonMessagesFactory({
            model: new Model({
                assessment: event.assessment,
                messages: event.messages
            })
        }));
    },
    showAssessmentsSelection: function (eventData) {
        debug("#showAssessmentsSelection");
        this.contentRegion.show(this.assessmentSelectionFactory());
    },

    showLayoutView: function () {
        debug("#showComparisonView");
        this.contentRegion.show(this.layoutFactory());
    },

    onDestroy: function () {
        this.dispatch('assess:ui:destroyed');
    }

});
