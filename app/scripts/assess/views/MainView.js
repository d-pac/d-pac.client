'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[MainView]' );
var tpl = require( './templates/MainView.hbs' );
var Marionette = require('backbone.marionette');
module.exports = Marionette.LayoutView.extend( {
    template : tpl,
    regions     : {
        contentRegion : "#assessment-content"
    },

    //avoid the idiotic div-wrapper
    tagName : "div",
    className: "row",

    contextEvents : {
        "comparisons:continuation:requested": "showContinueComparison",
        'comparisons:editing:requested': 'showLayoutView'
    },

    initialize : function(){
        debug( "#initialize" );
    },

    showContinueComparison : function(){
        this.contentRegion.show(this.comparisonsContinuationFactory());
    },

    showAssessmentsSelection : function(eventData){
        debug("#showAssessmentsSelection");
        this.contentRegion.show(this.assessmentSelectionFactory({
            allCompleted : eventData.allCompleted
        }));
    },

    showLayoutView : function(){
        debug("#showComparisonView");
        this.contentRegion.show(this.layoutFactory());
    }

} );
