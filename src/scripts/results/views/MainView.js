'use strict';

const _ = require( 'lodash' );
const debug = require( 'debug' )( 'dpac:results.views', '[LayoutView]' );
const tpl = require( './templates/MainView.hbs' );
const Marionette = require( 'backbone.marionette' );

module.exports = Marionette.LayoutView.extend( {
    authorization: undefined,
    template: tpl,

    tagName: "div",
    className: "row",

    regions: {
        selection: "#results-assessment-selection",
        menu: "#results-assessment-menu",
        overview: "#results-assessment-overview",
        ranking: '#results-representations-ranking',
        details: '#results-representation-details',
        feedback: '#results-representation-feedback'
    },

    contextEvents: {
        'results:assessment:selected': function( event ){
            const assessment = event.assessment;
            this.menu.show( this.createAssessmentMenu() );
            this.overview.empty();
            this.ranking.empty();
            this.details.empty();
            this.feedback.empty();
            this.renderOverview( assessment );
            this.renderRanking( assessment );
        },
        'results:representation:selected': function( e ){
            this.renderDetails( e );
            this.renderFeedback( e );
        }
    },

    initialize: function(){
        debug( "#initialize" );

    },

    onRender: function(){
        this.selection.show( this.createAssessmentSelection() );
        this.dispatch( 'results:ui:rendered' );
    },

    onDestroy: function(){
        this.dispatch( 'results:ui:destroyed' );
    },

    renderOverview: function( assessment ){
        _.delay( ()=>this.overview.show( this.createAssessmentOverview() ), 250 );
    },

    renderRanking: function( assessment ){
        if( this.authorization.isAllowedToViewRanking( assessment ) ){
            _.delay( ()=>this.ranking.show( this.createRanking() ), 250 );
        }
    },

    renderDetails: function(){
        this.details.$el.addClass( 'invisible-not-empty' );
        _.delay( ()=>{
            this.details.$el.removeClass( 'invisible-not-empty' );
            this.details.show( this.createDetails() );
        }, 250 );
    },

    renderFeedback: function( e ){
        this.feedback.$el.addClass( 'invisible-not-empty' );
        // const anchor = this.feedback.$el.offset().top - 100;
        _.delay( ()=>{
            this.feedback.$el.removeClass( 'invisible-not-empty' );
            this.feedback.show( this.createFeedback() );
            // if( e.triggeredByUser ){
            //     $( "html, body" ).animate( { scrollTop: anchor + "px" }, "slow" );
            // }
        }, 500 );
    }

} );
