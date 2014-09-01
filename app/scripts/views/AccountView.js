'use strict';
var debug = require( 'bows' )( 'dpac:views' );
var tpl = require( './templates/Account.hbs' );

module.exports = Backbone.Marionette.ItemView.extend( {
    template    : tpl,
    wiring      : ['accountModel'],
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
        debug( 'AccountView#initialize' );
        this.model = this.accountModel;
        this.model.fetch();
    },
    modelError : function( eventName ){
        console.log( 'MODEL ERROR', this.model );
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
