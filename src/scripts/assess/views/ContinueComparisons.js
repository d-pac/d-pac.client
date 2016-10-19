'use strict';
const {ItemView} = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:assess.views', '[ContinueComparisons]' );
const tpl = require( './templates/ContinueComparisons.hbs' );

module.exports = ItemView.extend( {
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
        this.ui.continueButton.prop('disabled', 'disabled');
        this.ui.continueButton.button('sending');
        this.dispatch( "comparisons:continue:confirmed" );
    },
    stopComparisons: function(){
        this.dispatch( "comparisons:continue:cancel" );
    }
} );
