'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[PhasesView]' );
var templates = {
    selection: require( './templates/phases/SelectRepresentation.hbs' ),
    comparative: require( './templates/phases/ComparativeFeedback.hbs' ),
    passfail : require('./templates/phases/PassFail.hbs')
};

module.exports = Marionette.LayoutView.extend( {
    className: "row",

    getTemplate: function(){
        var phase = this.model.get('currentPhase');
        var slug = phase.get( "slug" );
        return templates[ slug ];
    },

    ui: {
        aBtn: "#select-A-button",
        bBtn: "#select-B-button",
        submitFeedbackBtn: "#submit-feedback-button",
        feedbackInput: "#feedback-input"
    },

    events: {
        'click @ui.aBtn': "selectionMade",
        'click @ui.bBtn': "selectionMade",
        'click @ui.submitFeedbackBtn': 'feedbackProvided'
    },
    modelEvents: {
        'change:currentPhase': 'render'
    },

    initialize: function(){
        debug( "#initialize" );
    },

    serializeData: function(){
        return {
            representations: this.model.get( "comparison" ).get( "representations" ),
            passfail: this.model.get("assessment" ).get("uiCopy" ).phase_passfail
        };
    },

    selectionMade: function( event ){
        this.model.storeDataForCurrentPhase( this.$( event.currentTarget ).data( 'selection-id' ) );
    },

    feedbackProvided: function(event){
        this.model.storeDataForCurrentPhase( this.ui.feedbackInput.val() );
    }
} );
