'use strict';

const debug = require('debug')('dpac:assess.controllers', '[NavigationBlocker]');
const {Controller} = require('backbone.marionette');
const {history} = require('backbone');
const {t} = require('i18next');

module.exports = Controller.extend({
    enabled: false,
    contextEvents: {
        'comparison:ui:rendered': "enable",
        'comparison:ui:destroyed': 'disable'
    },

    initialize: function () {
        this.originalFn = history.loadUrl;
    },

    enable: function () {
        debug('#enable');
        if (!this.enabled) {
            this.enabled = true;
            history.loadUrl =  ()=>{
                if (!window.confirm(t('assess:please_finish.message'))) { //eslint-disable-line no-alert
                    const previousFragment = history.fragment;
                    window.location.hash = '#' + previousFragment;
                    return false;
                }
                this.disable();
                return this.originalFn.apply(this, arguments);
            };
            window.onbeforeunload = this._returnMessage;
        }
    },

    _returnMessage: function () {
        return t('assess:please_finish.message');
    },

    disable: function () {
        debug('#disable');
        if (this.enabled) {
            history.loadUrl = this.originalFn;
            window.onbeforeunload = undefined;
            this.enabled = false;
        }
    }
});
