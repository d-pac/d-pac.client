'use strict';

const debug = require( 'debug' )( 'dpac:assess.views', '[ComparisonLayout]' );
const tpl = require( './templates/ComparisonLayout.hbs' );
const {LayoutView} = require( 'backbone.marionette' );
const SavingView = require('./SavingView');

module.exports = LayoutView.extend( {
    template: tpl,

    className: "col-md-12 column",

    contextEvents: {
        "comparisons:editing:completed":"flashEmpty"
    },

    regions: {
        details: "#assessment-details",
        phases: "#assessment-phases",
        //wizard          : "#assessment-wizard",
        //detail          : "#assessment-detail",
        representations: "#assessment-representations",
        //judgements      : "#assessment-judgements"
    },

    initialize: function(){
        debug( "#initialize" );

    },

    flashEmpty: function(){
        this.phases.show(new SavingView());
        this.representations.reset();
    },

    onRender: function(){
        this.details.show( this.assessmentDetailsFactory() );
        this.phases.show( this.phasesFactory() );
        //this.wizard.show( this.wizardFactory() );
        this.representations.show( this.representationsFactory() );
        //this.judgements.show( this.judgementsFactory() );
        this.dispatch('comparison:ui:rendered');
    },

    onDestroy: function(){
        this.dispatch('comparison:ui:destroyed');
    }

} );
