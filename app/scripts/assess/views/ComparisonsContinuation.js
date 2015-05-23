'use strict';
var Marionette = require('backbone.marionette');
var debug = require( 'debug' )( 'dpac:assess.views', '[ComparisonsContinuation]' );
var tpl = require('./templates/ComparisonsContinuation.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    className : "col-md-12 column",

    ui: {
        continueButton: ".continue-button"
    },

    events: {
        "click @ui.continueButton": "continueComparison"
    },

    initialize : function(){
        debug("#initialize");
    },

    serializeData: function(){
        return {
            activesNum: this.collection.length
        };
    },

    continueComparison: function(){
        this.dispatch("comparisons:continuation:confirmed");
    }
});
