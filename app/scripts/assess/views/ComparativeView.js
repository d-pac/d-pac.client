'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[ComparativeView]' );
var tpl = require( './templates/ComparativeView.hbs' );

module.exports = Marionette.ItemView.extend( {
    template : tpl,
    className : "col-md-12 column",
    ui       : {
        editor     : "textarea",
        saveButton : ".save-button"
    },
    events : {
        "click @ui.saveButton" : "save"
    },

    initialize : function(){
        debug( "#initialize" );
    },

    save : function(){
        debug.debug('#save');
        this.model.set({
            comparativeFeedback :this.ui.editor.val()
        });
        this.trigger("comparativeFeedback:edited");
    }
} );
