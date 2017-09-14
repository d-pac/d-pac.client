'use strict';
const {ItemView} = require( 'backbone.marionette' );

const debug = require( 'debug' )( 'dpac:results.views', '[AssessmentSelection]' );
const tpl = require( './templates/AssessmentSelection.hbs' );

const {GA_DIM_ASSESSMENT} = require('../../common/constants');

module.exports = ItemView.extend( {
    template: tpl,
    initialize: function(){
        debug( '#initialize' );
        this.listenTo( this.collection, 'add', this.render.bind( this ) );
    },

    ui: {
        assessmentSelection: "#assessment-selection"
    },

    events: {
        'change @ui.assessmentSelection': "assessmentSelected"
    },

    serializeData: function(){
        const models = this.collection.toJSON();
        console.log(models);
        return { list:models};
    },

    assessmentSelected: function(){
        const model = this.collection.selectByID( this.$( "select option:selected" ).data( 'model-id' ) );
        ga('set', GA_DIM_ASSESSMENT, model.get('name'));
        this.dispatch( "results:assessment:selected", {
            assessment: model
        } );
    }
} );
