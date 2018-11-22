'use strict';

const { delay } = require( 'lodash' );

const debug = require('debug')('dpac:results.views', '[RankingMain]');
const tpl = require('./templates/RankingMain.hbs');
const {LayoutView} = require('backbone.marionette');
const $ = require( 'jquery' );

module.exports = LayoutView.extend({
    authorization: undefined,
    template: tpl,
    regions: {
        ranking: '#results-representations-ranking',
        details: '#results-representation-details',
        feedback: '#results-representation-feedback'
    },

    contextEvents: {
        'results:assessment:selected': 'empty',
        'results:representation:selected': function( e ){
            this.renderDetails( e );
            this.renderFeedback( e );
        }
    },

    modelEvents: {
        "change": "renderRanking"
    },

    onRender: function(){
        debug('#onRender', this);
        if(this.model.has('assessment')){
            this.renderRanking();
        }
        if(this.model.getSelectedRepresentationId()){
            this.renderDetails();
            this.renderFeedback();
        }
    },

    empty(){
        this.ranking && this.ranking.empty();
        this.details && this.details.empty();
        this.feedback && this.feedback.empty();

    },

    renderRanking: function(  ){
        debug('#renderRanking', this.model.get('assessment'));
        const assessment = this.model.get('assessmentModel');
        //todo: move to navigation
        if( assessment && this.authorization.isAllowedToViewRanking( assessment ) ){
            this.ranking.show( this.createRanking() );
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

});
