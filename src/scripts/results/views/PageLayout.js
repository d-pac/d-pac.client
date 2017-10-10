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

    onRender() {
        debug('#onRender');
        this.showPage();
    },

    showPage(page="ranking"){
        let view;
        switch(page){
            case "representations":
                view =this.createRepresentationsList;
                break;
            case "assessors":
                view = this.createAssessorsList;
                break;
            case "ranking":
            default:
                view = this.createRanking;
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
