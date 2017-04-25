'use strict';
const {ItemView} = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:assess.views', '[AssessmentDetails]' );
const tpl = require( './templates/AssessmentDetails.hbs' );

module.exports = ItemView.extend( {
    template: tpl,
    className: "well",

    ui: {
        stopBtn: "#comparison_stop_button"
    },

    events: {
        'click @ui.stopBtn': 'requestStop'
    },

    initialize: function(){
        debug( "#initialize" );
    },

    serializeData: function(){
        return this.model.getAssessment().toJSON();
    },

    requestStop: function(){
        debug('#requestStop');
        this.dispatch('comparison:stop:requested');
    }
} );
