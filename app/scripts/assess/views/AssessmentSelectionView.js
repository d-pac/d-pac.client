'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[AssessmentSelectionView]' );
var tpl = require( './templates/AssessmentSelection.hbs' );

module.exports = Marionette.ItemView.extend( {
    template         : tpl,
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
        debug( "#initialize" );
        console.log(this.collection);
    },

    assessmentSelected : function( event ){
        this.collection.selectByID( this.$( event.target ).attr( 'data-model-id' ) );
    }
} );