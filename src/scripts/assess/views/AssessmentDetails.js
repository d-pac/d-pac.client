'use strict';
const {ItemView} = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:assess.views', '[AssessmentDetails]' );
const tpl = require( './templates/AssessmentDetails.hbs' );

module.exports = ItemView.extend( {
    template: tpl,
    className: "well",

    ui: {
        pauseBtn: "#comparison_pause_button",
        continueBtn: "#pause_comparison button"
    },

    events: {
        'click @ui.pauseBtn': 'requestPause',
        'click @ui.continueBtn': 'requestContinue'
    },

    initialize: function(){
        debug( "#initialize" );
    },

    serializeData: function(){
        return this.model.get("assessment").toJSON();
    },

    requestPause: function(){
        debug('#requestPause');
        this.dispatch('assess:pause:requested');
    },

    requestContinue: function(){
        debug('#requestContinue');
        this.dispatch('assess:resume:requested');
    }
} );
