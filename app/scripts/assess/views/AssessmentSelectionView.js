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
    },

    serializeData: function(){
        var data = {
            items: this.collection.getActivesJSON(),
            assessmentWasCompleted: false
        };
        if(this.options.completedAssessment){
            data.title = this.options.completedAssessment.get('title');
            data.assessmentWasCompleted = true;
        }
        return data;
    },

    assessmentSelected: _.debounce( function( event ){
        var button = this.$( event.target );
        this.ui.assessmentButton.prop('disabled', 'disabled');
        button.button('sending');

        var model = this.collection.selectByID( button.data( 'model-id' ) );
        this.dispatch( "assessments:selection:completed", {
            assessment: model
        } );
    }, 1000, true )
} );
