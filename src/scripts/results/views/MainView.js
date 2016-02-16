'use strict';

var debug = require( 'debug' )( 'dpac:results.views', '[LayoutView]' );
var tpl = require( './templates/MainView.hbs' );
var Marionette = require( 'backbone.marionette' );
var $ = require( 'jquery' );

module.exports = Marionette.LayoutView.extend( {
    template: tpl,

    className: "col-md-12 column",

    regions: {
        selection: "#results-assessment-selection",
        menu: "#results-assessment-menu",
        overview: "#results-assessment-overview",
        ranking: '#results-representations-ranking',
        details: '#results-representation-details',
        feedback: '#results-representation-feedback'
    },

    contextEvents: {
        'results:assessment:selected': function(){
            this.menu.show( this.showAssessmentMenu() );
            this.overview.empty();
            this.ranking.empty();
            this.details.empty();
            this.feedback.empty();
            _.delay( function(){
                this.overview.show( this.showAssessmentOverview() );
                this.ranking.show( this.showRanking() );
            }.bind( this ), 250 );
        },
        'results:representation:selected': function(){
            this.details.$el.addClass( 'empty-region' );
            this.feedback.$el.addClass( 'empty-region' );
            var anchor = this.ranking.$el.offset().top + this.ranking.$el.height() - 100;
            _.delay( function(){
                this.details.$el.removeClass( 'empty-region' );
                this.details.show( this.showDetails() );
            }.bind( this ), 500 );
            _.delay( function(){
                this.feedback.$el.removeClass( 'empty-region' );
                this.feedback.show( this.showFeedback() );
                $( "html, body" ).animate( { scrollTop: anchor + "px" }, "slow" );
            }.bind( this ), 1000 )
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
