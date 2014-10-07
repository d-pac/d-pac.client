'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[SeqView]' );
var tpl = require( './templates/SeqView.hbs' );

module.exports = Marionette.ItemView.extend( {
    template : tpl,
    ui       : {
        slider : "#seq-slider",
        saveButton : ".save-button"
    },
    events : {
        "click @ui.saveButton" : "save"
    },

    initialize : function(){
        debug( "#initialize" );
    },
    onRender   : function(){
        this.ui.slider.slider();
    },

    save : function(){
        this.collection.create({
            value :this.ui.slider.slider('getValue')
        });
    }
} );
