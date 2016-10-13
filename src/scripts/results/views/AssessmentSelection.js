'use strict';
const {ItemView} = require( 'backbone.marionette' );

const debug = require( 'debug' )( 'dpac:results.views', '[AssessmentSelection]' );
const tpl = require( './templates/AssessmentSelection.hbs' );

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

    onRender: function(){
        debug( '#render', this.collection.length );
    },

    serializeData: function(){
        const data = {
            list: this.collection.toJSON()
        };
        debug( '#serializeData', data, this.collection );
        return data;
    },

    assessmentSelected: function(){
        const model = this.collection.selectByID( this.$( "select option:selected" ).data( 'model-id' ) );
        this.dispatch( "results:assessment:selected", {
            assessment: model
        } );
    }
} );
