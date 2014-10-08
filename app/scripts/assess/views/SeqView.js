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

        debug.debug(this.model);
    },
    onRender   : function(){
        this.ui.slider.slider();
        this.ui.slider.slider('setValue', this.model.get('value'));
    },

    save : function(){
        debug.debug('#save');
        this.model.set({
            value :this.ui.slider.slider('getValue')
        });
        this.trigger("seq:edited");
    }
} );
