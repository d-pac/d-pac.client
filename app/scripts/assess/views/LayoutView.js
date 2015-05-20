'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[LayoutView]' );
var tpl = require( './templates/LayoutView.hbs' );
var Marionette = require('backbone.marionette');
module.exports = Marionette.LayoutView.extend( {
    template : tpl,

    regions : {
        details : "#assessment-details",
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
        //this.detail.show( this.detailFactory() );
        //this.wizard.show( this.wizardFactory() );
        this.representations.show( this.representationsFactory() );
        //this.judgements.show( this.judgementsFactory() );
    }

} );
