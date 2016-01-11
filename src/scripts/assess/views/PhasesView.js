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
        'click @ui.submitFeedbackBtn': 'comparativeFeedbackProvided',
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
        var feedbackA = this.model.getFeedbackByOrder( 'a' );
        var feedbackB = this.model.getFeedbackByOrder( 'b' );
        var data = {
            representations: this.model.get( "comparison" ).get( "representations" ),
            title: i18n.t( "assess:phase_" + slug + ".title" ),
            description: i18n.t( "assess:phase_" + slug + ".description" ),
            seq: {
                values: values,
                selected: this.seqValue
            },
            feedback: {
                a: (feedbackA)
                    ? feedbackA.get( 'proscons' )
                    : {
                    positive: '',
                    negative: ''
                },
                b: (feedbackB)
                    ? feedbackB.get( 'proscons' )
                    : {
                    positive: '',
                    negative: ''
                }
            }
        };
        return data;
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

    comparativeFeedbackProvided: function( event ){
        this.ui.submitFeedbackBtn.prop( 'disabled', 'disabled' );
        this.ui.submitFeedbackBtn.button( 'sending' );
        this.model.storeDataForCurrentPhase( this.ui.feedbackInput.val() );
    },

    saveProsCons: function( event ){
        this.ui.submitProsConsBtn.prop( 'disabled', 'disabled' );
        this.ui.submitProsConsBtn.button( 'sending' );
        //this.model.storeDataForCurrentPhase( {
        //    aPositive:,
        //    aNegative: this.$( '#a-negative' ).val(),
        //    bPositive: this.$( '#b-positive' ).val(),
        //    bNegative: this.$( '#b-negative' ).val()
        //} );
        this.model.storeFeedback( {
            a: {
                positive: this.$( '#a-positive' ).val(),
                negative: this.$( '#a-negative' ).val()
            },
            b: {
                positive: this.$( '#b-positive' ).val(),
                negative: this.$( '#b-negative' ).val()
            }
        } )
    }
} )
;
