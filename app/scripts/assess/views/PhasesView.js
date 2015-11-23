'use strict';
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[PhasesView]' );
var i18n = require( 'i18next' );

var templates = {
    selection: require( './templates/phases/SelectRepresentation.hbs' ),
    comparative: require( './templates/phases/ComparativeFeedback.hbs' ),
    passfail: require( './templates/phases/PassFail.hbs' ),
    "seq-selection": require( './templates/phases/Seq.hbs' ),
    "seq-comparative": require( './templates/phases/Seq.hbs' ),
    "pros-cons": require( './templates/phases/ProsCons.hbs' )
};

module.exports = Marionette.LayoutView.extend( {
    className: "row",

    getTemplate: function(){
        var phase = this.model.get( 'currentPhase' );
        var slug = phase.get( "slug" );
        return templates[ slug ];
    },

    ui: {
        aBtn: "#select-A-button",
        bBtn: "#select-B-button",
        submitFeedbackBtn: "#submit-feedback-button",
        feedbackInput: "#feedback-input",
        seqBtn: ".seq-button",
        submitSeqBtn: "#submit-seq-button",
        submitProsConsBtn: "#submit-proscons-button"
    },

    events: {
        'click @ui.aBtn': "selectionMade",
        'click @ui.bBtn': "selectionMade",
        'click @ui.submitFeedbackBtn': 'feedbackProvided',
        'click @ui.seqBtn': 'seqValueSelected',
        'click @ui.submitSeqBtn': 'saveSeq',
        'click @ui.submitProsConsBtn': 'saveProsCons'
    },
    modelEvents: {
        'change:currentPhase': 'render'
    },

    initialize: function(){
        debug( "#initialize" );
    },

    serializeData: function(){
        var phase = this.model.get( 'currentPhase' );
        var slug = phase.get( "slug" );
        var values = [];
        _.times( 7, function( i ){
            var value = i + 1;
            values.push( {
                value: value,
                selected: (this.seqValue === value)
            } );
        }, this );
        return {
            representations: this.model.get( "comparison" ).get( "representations" ),
            title: i18n.t( "assessment:phase_" + slug + ".title" ),
            description: i18n.t( "assessment:phase_" + slug + ".description" ),
            seq: {
                values: values,
                selected: this.seqValue
            }
        }
    },

    seqValueSelected: function( event ){
        this.seqValue = this.$( event.currentTarget ).data( 'value' );
        this.render();
    },

    saveSeq: function(){
        this.ui.submitSeqBtn.prop( 'disabled', 'disabled' );
        this.ui.submitSeqBtn.button( 'sending' );
        this.model.storeDataForCurrentPhase( this.seqValue );
        this.seqValue = undefined;
    },

    selectionMade: function( event ){
        this.ui.aBtn.prop( 'disabled', 'disabled' );
        this.ui.aBtn.button( 'sending' );
        this.ui.bBtn.prop( 'disabled', 'disabled' );
        this.ui.bBtn.button( 'sending' );
        this.model.storeDataForCurrentPhase( this.$( event.currentTarget ).data( 'selection-id' ) );
    },

    feedbackProvided: function( event ){
        this.ui.submitFeedbackBtn.prop( 'disabled', 'disabled' );
        this.ui.submitFeedbackBtn.button( 'sending' );
        this.model.storeDataForCurrentPhase( this.ui.feedbackInput.val() );
    },

    saveProsCons: function( event ){
        this.ui.submitProsConsBtn.prop( 'disabled', 'disabled' );
        this.ui.submitProsConsBtn.button( 'sending' );
        this.model.storeDataForCurrentPhase( {
            aPositive: this.$( '#a-positive' ).val(),
            aNegative: this.$( '#a-negative' ).val(),
            bPositive: this.$( '#b-positive' ).val(),
            bNegative: this.$( '#b-negative' ).val()
        } );
    }
} )
;
