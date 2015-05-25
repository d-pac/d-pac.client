'use strict';
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[AssessmentSelectionView]' );
var tpl = require( './templates/AssessmentSelection.hbs' );

module.exports = Marionette.ItemView.extend( {
    template: tpl,
    className: "col-md-12 column",
    ui: {
        assessmentButton: ".assessment-button"
    },
    events: {
        'click @ui.assessmentButton': "assessmentSelected"
    },

    initialize: function( opts ){
        debug( "#initialize" );
        this.allCompleted = opts.allCompleted;
    },

    serializeData: function(){
        return {
            allCompleted: this.allCompleted,
            items: this.collection.getActivesJSON()
        };
    },

    assessmentSelected: _.debounce( function( event ){
        var model = this.collection.selectByID( this.$( event.target ).data( 'model-id' ) );
        console.log(this.collection);
        this.dispatch( "assessments:selection:completed", {
            assessment: model
        } );
    }, 1000, true )
} );
