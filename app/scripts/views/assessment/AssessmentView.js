'use strict';

var debug = require( 'debug' )( 'dpac:views' );
var tpl = require( './templates/AssessmentView.hbs' );

module.exports = Marionette.LayoutView.extend( {
    template : tpl,
    regions     : {
        contentRegion : "#assessment-content"
    },
    wiring      : ['AssessmentSelectionView', 'ComparisonView'],
    contextEvents : {
        "assessments:selection:requested": "showAssessmentsSelection",
        "comparisons:editing:requested" : "showComparisonEditor"
    },

    initialize : function(){
        debug( "AssessmentView#initialize" );
    },

    showAssessmentsSelection : function(){
        debug("AssessmentView#showAssessmentsSelection");
        this.contentRegion.show(this.AssessmentSelectionView());
    },

    showComparisonEditor : function(){
        debug("AssessmentView#showComparisonEditor");
        this.contentRegion.show(this.ComparisonView());
    }

} );