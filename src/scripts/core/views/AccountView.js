'use strict';
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
    initialize: function(){
        debug('#initialize');
    },
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
            data.password_confirm = this.$( '#password-confirmation' ).val();
        }

        this.model.patch( data );
    }
} )
;
