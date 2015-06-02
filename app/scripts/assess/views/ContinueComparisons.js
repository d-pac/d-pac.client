'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[ContinueComparisons]' );
var tpl = require( './templates/ContinueComparisons.hbs' );

module.exports = Marionette.ItemView.extend( {
    template: tpl,
    className: "col-md-12 column",

    ui: {
        continueButton: "#continue-button",
        stopButton: "#stop-button"
    },

    events: {
        "click @ui.continueButton": "continueComparisons",
        "click @ui.stopButton": "stopComparisons"
    },

    initialize: function(){
        debug( "#initialize" );
    },

    serializeData: function(){
        this.model = this.collection.selected;
        return this.model.toJSON();
    },

    continueComparisons: function(){
        debug('#continueComparisons');
        this.dispatch( "comparisons:continue:confirmed" );
    },
    stopComparisons: function(){
        this.dispatch( "comparisons:continue:cancel" );
    }
} );
