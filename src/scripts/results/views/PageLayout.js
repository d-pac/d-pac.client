'use strict';

const debug = require('debug')('dpac:results.views', '[PageLayout]');
const tpl = require('./templates/PageLayout.hbs');
const {LayoutView} = require('backbone.marionette');

module.exports = LayoutView.extend({
    template: tpl,

    regions: {
        content: "#panel-page"
    },

    ui: {
        selector: "#page-selection"
    },

    events: {
        'change @ui.selector': 'pageSelected'
    },

    modelEvents: {
        'change': "render"
    },

    initialize() {
        debug('#initialize', this.cid);
    },

    onRender() {
        debug('#onRender');
        this.showPage();
    },

    showPage(page = "overview") {
        debug('#showPage', page);
        let view;
        switch (page) {
            case "representations":
                view = this.createRepresentationsList;
                break;
            case "assessors":
                view = this.createAssessorsList;
                break;
            case "ranking":
                view = this.createRanking;
                break;
            case "overview":
            default:
                view = this.createOverview;
        }
        this.content.show(view());
    },

    pageSelected() {
        debug('#pageSelected');
        const elem = this.ui.selector[0];
        const page = elem.options[elem.selectedIndex].value;
        this.showPage(page);
    }
});
