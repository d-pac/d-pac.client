'use strict';
var {ItemView} = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[UnfinishedComparisons]' );
const tpl = require( './templates/UnfinishedComparisons.hbs' );

module.exports = ItemView.extend( {
    template: tpl,
    className: "col-md-12 column",

    ui: {
        continueButton: ".continue-button"
    },

    events: {
        "click @ui.continueButton": "continueComparison"
    },

    initialize: function(){
        debug( "#initialize" );
    },

    serializeData: function(){
        const activeComparisons = this.collection.getActives();
        return {
            activesNum: activeComparisons.length
        };
    },

    continueComparison: function(){
        this.dispatch( "comparisons:unfinished:confirmed" );
    }
} );
