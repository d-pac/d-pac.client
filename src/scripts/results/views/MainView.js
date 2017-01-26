'use strict';

const { delay } = require( 'lodash' );
const debug = require( 'debug' )( 'dpac:results.views', '[LayoutView]' );
const tpl = require( './templates/MainView.hbs' );
const { LayoutView } = require( 'backbone.marionette' );
const $ = require( 'jquery' );

module.exports = LayoutView.extend( {
    authorization: undefined,
    template: tpl,

    tagName: "div",
    className: "row",

    ui:{
        scrolldown: "#scrolldown"
    },

    events:{
        "click @ui.scrolldown": "scrollToBottom"
    },

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
        const bodyElem = document.body;
        const $doc = $(document);
        this.scrolldownInterval = setInterval( () =>{
            //bodyElem.scrollHeight - (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) > window.innerHeight
            if(bodyElem.scrollHeight - $doc.scrollTop() > window.innerHeight){
                this.ui.scrolldown.fadeIn();
            }else{
                this.ui.scrolldown.fadeOut();
            }
        }, 500 )
    },

    onDestroy: function(){
        this.dispatch( 'results:ui:destroyed' );
        clearInterval(this.scrolldownInterval);
    },

    renderOverview: function( assessment ){
        delay( () => this.overview.show( this.createAssessmentOverview() ), 250 );
    },

    renderRanking: function( assessment ){
        if( this.authorization.isAllowedToViewRanking( assessment ) ){
            delay( () => this.ranking.show( this.createRanking() ), 250 );
        }
    },

    renderDetails: function(){
        this.details.$el.addClass( 'invisible-not-empty' );
        delay( () =>{
            this.details.$el.removeClass( 'invisible-not-empty' );
            this.details.show( this.createDetails() );
        }, 250 );
    },

    renderFeedback: function( e ){
        this.feedback.$el.addClass( 'invisible-not-empty' );
        delay( () =>{
            this.feedback.$el.removeClass( 'invisible-not-empty' );
            this.feedback.show( this.createFeedback() );
        }, 500 );
    },

    scrollToBottom: function(  ){
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }

} );
