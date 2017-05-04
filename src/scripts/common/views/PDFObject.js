'use strict';
const {ItemView} = require('backbone.marionette');

const debug = require('debug')('dpac:common.views', '[PDFObject]');
const PDFObject = require('pdfobject');
const i18n = require('i18next');

module.exports = ItemView.extend({

    // onShow() {
    //     debug('onShow');
    // },
    // onAttach(){
    //     debug('onAttach');
    // },
    // onRender() {
    //     debug('onRender');
    // },
    onShow() {
        const options = {
            fallbackLink: i18n.t("common:pdf_fallback.link"),
            PDFJS_URL: "pdfjs/web/viewer.html"
        };

        setTimeout( ()=>{
        PDFObject.embed(this.model.get('document.href'), `#pdf-${this.model.get('_id')}`, options);

        }, 500)
    }
});
