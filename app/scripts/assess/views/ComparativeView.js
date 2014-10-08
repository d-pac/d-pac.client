'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[ComparativeView]' );
var tpl = require( './templates/ComparativeView.hbs' );

module.exports = Marionette.ItemView.extend( {
    template : tpl,
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

    onRender : function(){
        this.ui.editor.wysihtml5( {
            toolbar : {
                "font-styles" : false,
                link          : false,
                image         : false,
                color         : false,
                size          : "sm"
            }
        } );
    },
    save : function(){
        debug.debug('#save');
        this.model.set({
            comparativeFeedback :this.ui.editor.val()
        });
        this.trigger("comparativeFeedback:edited");
    }
} );
