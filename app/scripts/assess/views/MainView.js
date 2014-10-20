'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[MainView]' );
var tpl = require( './templates/MainView.hbs' );

module.exports = Marionette.LayoutView.extend( {
    template : tpl,
    regions     : {
        contentRegion : "#assessment-content"
    },

    //avoid the idiotic div-wrapper
    tagName : "div",
    className: "row",

    contextEvents : {
        "assessments:selection:requested": "showAssessmentsSelection",
        "mementos:editing:requested" : "showLayoutView"
    },

    initialize : function(){
        debug( "#initialize" );
    },

    showAssessmentsSelection : function(eventData){
        debug("#showAssessmentsSelection");
        this.contentRegion.show(this.createAssessmentSelectionView({
            allCompleted : eventData.allCompleted
        }));
    },

    showLayoutView : function(){
        debug("#showComparisonView");
        this.contentRegion.show(this.createLayoutView());
    }

} );
