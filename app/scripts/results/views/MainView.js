'use strict';

var debug = require( 'debug' )( 'dpac:results.views', '[LayoutView]' );
var tpl = require( './templates/MainView.hbs' );
var Marionette = require( 'backbone.marionette' );

module.exports = Marionette.LayoutView.extend( {
    template: tpl,

    className: "col-md-12 column",

    regions: {
        selection: "#results-assessment-selection",
        assessment: "#results-assessment-menu",
        content: "#results-content",
    },

    initialize: function(){
        debug( "#initialize" );
    },

    onRender: function(){
        this.selection.show( this.showAssessmentSelection() );
        this.assessment.show( this.showAssessmentMenu() );
        //this.content.show( this.showOverview() );
        this.dispatch('results:ui:rendered');
    },

    onDestroy: function(){
        this.dispatch('results:ui:destroyed');
    }

} );
