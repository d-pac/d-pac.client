'use strict';
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var i18n = require( 'i18next' );

var debug = require( 'debug' )( 'dpac:core.views', '[AccountView]' );
var tpl = require( './templates/Account.hbs' );

module.exports = Marionette.ItemView.extend( {
    template: tpl,
    modelEvents: {
        "sync": "handleSuccess",
        "error": "render"
    },
    ui: {
        saveButton: '.save-btn',
        form: "#account-form"
    },
    events: {
        "click @ui.saveButton": "save"
    },

    //initialize : function(){
    //    debug( '#initialize' );
    //    this.model.fetch();
    //    this.saving = false;
    //},
    //
    onRender : function(){
        console.log(this.model);
    },
    //
    //isValid : function(){
    //    return !this.$( this.ui.form ).find( '.has-error' ).length
    //},
    //
    //setButtonStates : _.debounce( function(){
    //    debug("#setButtonState");
    //    this.$( this.ui.saveButton ).prop( 'disabled', !this.isValid() || this.saving );
    //}, 500 ),
    //
    //modelError : function( eventName ){
    //    this.success=this.saving=false;
    //    this.render();
    //},
    //
    //synced : function(){
    //    debug("#synced");
    //    this.success=this.saving;
    //    this.saving=false;
    //    this.render();
    //},
    //
    //serializeData : function(){
    //    var data = this.model.toJSON();
    //    data.success = this.success;
    //    return data;
    //},
    //

    handleSuccess: function(){
        this.render();
        //this.ui.saveButton.prop( 'disabled', false );
        //this.ui.saveButton.button( 'reset' );
        this.dispatch( 'app:show:messages', {
            type: i18n.t( "account:messages.saved.type" ) || "success",
            title: i18n.t( "account:messages.saved.title" ) || '',
            message: i18n.t( "account:messages.saved.message" ),
        } );
    },
    save: function(){
        this.ui.saveButton.prop( 'disabled', 'disabled' );
        this.ui.saveButton.button( 'saving' );
        var data = {
            name: {
                first: this.$( "#firstname" ).val(),
                last: this.$( "#surname" ).val()
            },
            email: this.$( "#email" ).val()
        };
        var password = this.$( "#password" ).val();
        if( password ){
            data.password = password;
            data.password_confirm = this.$( '#password-confirmation' ).val()
        }

        this.model.patch( data );
    }
} )
;
