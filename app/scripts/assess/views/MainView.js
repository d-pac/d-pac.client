'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[MainView]' );
var tpl = require( './templates/MainView.hbs' );

module.exports = Marionette.LayoutView.extend( {
    template : tpl,
    regions     : {
        contentRegion : "#assessment-content"
    },
    contextEvents : {
        "assessments:selection:requested": "showAssessmentsSelection",
        "aggregates:editing:requested" : "showAggregateEditor"
    },

    initialize : function(){
        debug( "#initialize" );
    },

    showAssessmentsSelection : function(){
        debug("#showAssessmentsSelection");
        this.contentRegion.show(this.createAssessmentSelectionView());
    },

    showAggregateEditor : function(){
        debug("#showAggregateEditor");
        this.contentRegion.show(this.createAggregateView());
    }

} );