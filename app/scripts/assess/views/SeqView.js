'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[SeqView]' );
var tpl = require( './templates/SeqView.hbs' );

module.exports = Marionette.ItemView.extend( {
    template : tpl,
    className: "col-md-12 column",
    ui       : {
        saveButton : ".save-button",
        valueButtons : ".value-buttons .btn"
    },
    events : {
        "click @ui.saveButton" : "save"
    },

    initialize : function(){
        debug( "#initialize" );

        debug.debug(this.model);
    },
    onRender   : function(){
        var selected  = this.model.get('value');
        if(selected){
            this.$("label[data-value='"+ selected + "']" ).addClass('active');
        }
    },

    save : function(){
        debug.debug('#save');
        this.model.set({
            value : this.$("label.active" ).attr('data-value')
        });
        this.trigger("seq:edited");
    }
} );
