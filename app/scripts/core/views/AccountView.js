'use strict';
var debug = require( 'debug' )( 'dpac:core.views', '[AccountView]' );
var tpl = require( './templates/Account.hbs' );

module.exports = Backbone.Marionette.ItemView.extend( {
    template    : tpl,
    modelEvents : {
        "error" : "modelError",
        "sync"  : "synced"
    },
    ui          : {
        saveButton : '.save-btn',
        form       : "#account-form"
    },
    events      : {
        "click @ui.saveButton"   : "save",
        "validated.bs.validator" : "setButtonStates"
    },

    initialize : function(){
        debug( '#initialize' );
        this.model.fetch();
        this.saving = false;
    },

    onRender : function(){
        this.$( this.ui.form ).validator();
        this.setButtonStates();
        if(this.success){
            _.delay(function(){
                this.saving=this.success=false;
                this.render();
            }.bind(this), 10000);
        }
    },

    isValid : function(){
        return !this.$( this.ui.form ).find( '.has-error' ).length
    },

    setButtonStates : _.debounce( function(){
        debug("#setButtonState");
        this.$( this.ui.saveButton ).prop( 'disabled', !this.isValid() || this.saving );
    }, 500 ),

    modelError : function( eventName ){
        this.success=this.saving=false;
        this.render();
    },

    synced : function(){
        debug("#synced");
        this.success=this.saving;
        this.saving=false;
        this.render();
    },

    serializeData : function(){
        var data = this.model.toJSON();
        data.success = this.success;
        return data;
    },

    save : function(){
        if( this.isValid() ){
            this.saving = true;
            var $btn = this.$(this.ui.saveButton ).button('saving');
            this.model.save( {
                name  : {
                    first : this.$( "#firstname" ).val(),
                    last  : this.$( "#surname" ).val()
                },
                email : this.$( "#email" ).val()
                //password : this.$( "#password" ).val(),
                //password_confirm : this.$('#password-confirmation' ).val()
            }, { patch : true } );
        }
    }
} );
