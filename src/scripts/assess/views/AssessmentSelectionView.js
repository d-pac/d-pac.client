'use strict';
const {debounce} = require( 'lodash' );
const {ItemView} = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:assess.views', '[AssessmentSelectionView]' );
const tpl = require( './templates/AssessmentSelection.hbs' );

module.exports = ItemView.extend( {
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
        const data = {
            items: this.collection.getAssessables().toJSON(),
            assessmentWasCompleted: false
        };
        if(this.options.completedAssessment){
            data.title = this.options.completedAssessment.get('title');
            data.assessmentWasCompleted = true;
        }
        return data;
    },

    assessmentSelected: debounce( function( event ){
        const button = this.$( event.target );
        this.ui.assessmentButton.prop('disabled', 'disabled');
        button.button('sending');

        const model = this.collection.selectByID( button.data( 'model-id' ) );
        this.dispatch( "assessments:selection:completed", {
            assessment: model
        } );
    }, 1000, true )
} );
