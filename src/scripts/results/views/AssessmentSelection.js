'use strict';
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );

var debug = require( 'debug' )( 'dpac:results.views', '[AssessmentSelection]' );
var tpl = require( './templates/AssessmentSelection.hbs' );

module.exports = Marionette.ItemView.extend( {
    template: tpl,
    initialize: function(){
        debug( '#initialize' );
        this.collection.on( 'add', this.render, this );
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
        var data = {
            list: this.collection.toJSON()
        };
        debug( '#serializeData', data, this.collection );
        return data;
    },

    assessmentSelected: function(){
        var model = this.collection.selectByID( this.$( "select option:selected" ).data( 'model-id' ) );
        this.dispatch( "results:assessment:selected", {
            assessment: model
        } );
    }
} );
