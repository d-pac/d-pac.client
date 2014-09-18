'use strict';

var debug = require( 'debug' )( 'dpac:views' );
var tpl = require( './templates/AssessmentSelection.hbs' );

module.exports = Marionette.ItemView.extend( {
    template : tpl,
    collectionEvents : {
        "add" : "render"
    },
    ui               : {
        assessmentButton : "button"
    },
    events           : {
        'click @ui.assessmentButton' : "assessmentSelected"
    },

    initialize : function(){
        debug( "AssessmentSelectionView#initialize" );
    },

    assessmentSelected : function( event ){
        this.dispatch( 'assessment:selection:completed', {
            assessment : this.$( event.target ).attr( 'data-model-id' )
        } );
    }
} );
