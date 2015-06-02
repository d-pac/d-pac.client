'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[MainView]' );
var tpl = require( './templates/MainView.hbs' );
var Marionette = require( 'backbone.marionette' );
var Backbone = require( 'backbone' );
module.exports = Marionette.LayoutView.extend( {
    template: tpl,
    unfinishedComparisonsFactory: undefined,
    continueComparisonsFactory: undefined,
    assessmentSelectionFactory: undefined,
    layoutFactory: undefined,
    comparisonMessagesFactory: undefined,

    regions: {
        contentRegion: "#assessment-content"
    },

    //avoid the idiotic div-wrapper
    tagName: "div",
    className: "row",

    contextEvents: {
        "comparisons:unfinished:requested": "showUnfinishedComparison",
        "comparisons:continue:requested": "showContinueComparison",
        'comparisons:editing:requested': 'showLayoutView',
        'assessments:selection:requested': 'showAssessmentsSelection',
        'comparisons:creation:failed': 'showComparisonMessage'
    },

    initialize: function(){
        debug( "#initialize" );
    },

    onRender: function(){
        this.dispatch( 'assess:ui:rendered' );
    },

    showUnfinishedComparison: function(){
        this.contentRegion.show( this.unfinishedComparisonsFactory() );
    },

    showContinueComparison: function(){
        this.contentRegion.show( this.continueComparisonsFactory() );
    },

    showComparisonMessage: function( event ){
        this.contentRegion.show( this.comparisonMessagesFactory( {
            model: new Backbone.Model( {
                assessment: event.assessment,
                messages: event.messages
            } )
        } ) );
    },
    showAssessmentsSelection: function( eventData ){
        debug( "#showAssessmentsSelection" );
        this.contentRegion.show( this.assessmentSelectionFactory( {
            allCompleted: eventData.allCompleted
        } ) );
    },

    showLayoutView: function(){
        debug( "#showComparisonView" );
        this.contentRegion.show( this.layoutFactory() );
    },

    onDestroy: function(){
        this.dispatch( 'assess:ui:destroyed' );
    }

} );
