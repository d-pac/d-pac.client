'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[AssessmentDetails]' );
var tpl = require( './templates/AssessmentDetails.hbs' );

module.exports = Marionette.ItemView.extend( {
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
        this.dispatch('timelogs:stop:requested');
    },

    requestContinue: function(){
        debug('#requestContinue');
        this.dispatch('timelogs:start:requested');
    }
} );
