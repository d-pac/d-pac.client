'use strict';

var debug = require( 'debug' )( 'dpac:results.views', '[LayoutView]' );
var tpl = require( './templates/MainView.hbs' );
var Marionette = require( 'backbone.marionette' );

module.exports = Marionette.LayoutView.extend( {
    template: tpl,

    className: "col-md-12 column",

    regions: {
        selection: "#results-assessment-selection",
        menu: "#results-assessment-menu",
        overview: "#results-assessment-overview",
    },

    contextEvents: {
        'results:assessment:selected': function(){
            this.menu.show( this.showAssessmentMenu() );
            this.overview.show( this.showAssessmentOverview() );
        }
    },

    initialize: function(){
        debug( "#initialize" );
    },

    onRender: function(){
        this.selection.show( this.showAssessmentSelection() );
        //this.assessment.show( this.showAssessmentMenu() );
        //this.content.show( this.showOverview() );
        this.dispatch( 'results:ui:rendered' );
    },

    onDestroy: function(){
        this.dispatch( 'results:ui:destroyed' );
    }

} );
