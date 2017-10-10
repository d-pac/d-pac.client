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

    regions: {
        selection: "#results-assessment-selection",
        menu: "#results-assessment-menu",
        overview: "#results-assessment-overview",
        page: "#results-page"
    },

    ui:{
        scrolldown: "#scrolldown"
    },

    events:{
        "click @ui.scrolldown": "scrollToBottom"
    },

    contextEvents: {
        'results:assessment:selected': function( event ){
            const assessment = event.assessment;
            this.menu.show( this.createAssessmentMenu() );
            this.overview.empty();
            this.renderOverview( assessment );
            this.page.empty();
            this.renderPage( assessment );
        },
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
        }, 500 );
    },
    onDestroy: function(){
        this.dispatch( 'results:ui:destroyed' );
        clearInterval(this.scrolldownInterval);
    },

    renderOverview: function( assessment ){
        delay( () => this.overview.show( this.createAssessmentOverview() ), 250 );
    },

    renderPage: function(){
        delay(()=>this.page.show(this.createPage()), 500);
    },

    scrollToBottom: function(  ){
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }


} );
