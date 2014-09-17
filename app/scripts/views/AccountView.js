'use strict';
var debug = require( 'debug' )( 'dpac:views', '[AccountView]' );
var tpl = require( './templates/Account.hbs' );

module.exports = Backbone.Marionette.ItemView.extend( {
    template    : tpl,
    modelEvents : {
        "error" : "modelError",
        "sync"  : "render"
    },
    ui          : {
        saveButton : '.save-btn'
    },
    events      : {
        "click @ui.saveButton" : "save"
    },

    initialize : function(){
        debug( '#initialize' );
        this.model.fetch();
    },
    modelError : function( eventName ){
        debug( 'MODEL ERROR', this.model );
    },
    save       : function(){
        this.model.save( {
            name  : {
                first : this.$( "#firstname" ).val(),
                last  : this.$( "#surname" ).val()
            },
            email : this.$( "#email" ).val()
        }, { patch : true } );
    }
} );
