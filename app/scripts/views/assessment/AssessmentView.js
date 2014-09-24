'use strict';

var debug = require( 'debug' )( 'dpac:views', '[AssessmentView]' );
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
        debug( "#initialize" );
    },

    showAssessmentsSelection : function(){
        debug("#showAssessmentsSelection");
        this.contentRegion.show(this.AssessmentSelectionView());
    },

    showComparisonEditor : function(){
        debug("#showComparisonEditor");
        this.contentRegion.show(this.ComparisonView());
    }

} );
