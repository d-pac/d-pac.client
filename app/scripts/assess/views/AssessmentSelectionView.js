'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[AssessmentSelectionView]' );
var tpl = require( './templates/AssessmentSelection.hbs' );

module.exports = Marionette.ItemView.extend( {
    template         : tpl,
    className        : "col-md-8 col-md-offset-2 column",
    collectionEvents : {
        "add" : "render"
    },
    ui               : {
        assessmentButton : "button"
    },
    events           : {
        'click @ui.assessmentButton' : "assessmentSelected"
    },

    initialize : function(opts){
        debug( "#initialize" );
        this.allCompleted = opts.allCompleted;
    },

    serializeData : function(){
        return {
            allCompleted : this.allCompleted,
            items : this.collection.toJSON()
        };
    },

    assessmentSelected : _.debounce(function( event ){
        this.collection.selectByID( this.$( event.target ).attr( 'data-model-id' ) );
    }, 1000, true)
} );
