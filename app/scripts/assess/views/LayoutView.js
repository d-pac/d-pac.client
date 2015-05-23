'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[LayoutView]' );
var tpl = require( './templates/LayoutView.hbs' );
var Marionette = require('backbone.marionette');
module.exports = Marionette.LayoutView.extend( {
    template : tpl,

    className: "col-md-12 column",

    regions : {
        details : "#assessment-details",
        phases: "#assessment-phases",
        //wizard          : "#assessment-wizard",
        //detail          : "#assessment-detail",
        representations : "#assessment-representations",
        //judgements      : "#assessment-judgements"
    },

    initialize : function(){
        debug( "#initialize" );
    },

    onRender : function(){
        this.details.show( this.assessmentDetailsFactory() );
        this.phases.show(this.phasesFactory());
        //this.wizard.show( this.wizardFactory() );
        this.representations.show( this.representationsFactory() );
        //this.judgements.show( this.judgementsFactory() );
    }

} );
