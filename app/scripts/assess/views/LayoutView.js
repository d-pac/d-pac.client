'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[LayoutView]' );
var tpl = require( './templates/LayoutView.hbs' );

module.exports = Marionette.LayoutView.extend( {
    wizardFactory          : undefined,
    detailFactory          : undefined,
    representationsFactory : undefined,
    judgementsFactory      : undefined,

    className : "col-md-12 column",

    template : tpl,

    regions : {
        progress        : "#assessment-progress",
        wizard          : "#assessment-wizard",
        detail          : "#assessment-detail",
        representations : "#assessment-representations",
        judgements      : "#assessment-judgements"
    },

    initialize : function(){
        debug( "#initialize" );
    },

    onRender : function(){
        this.progress.show( this.progressFactory() );
        this.detail.show( this.detailFactory() );
        this.wizard.show( this.wizardFactory() );
        this.representations.show( this.representationsFactory() );
        this.judgements.show( this.judgementsFactory() );
    }

} );
