'use strict';

const debug = require( 'debug' )( 'dpac:core.views', '[SigninView]' );
const tpl = require( './templates/Signin.hbs' );
const {LayoutView} = require( 'backbone.marionette' );

module.exports = LayoutView.extend( {
    template: tpl,

    ui: {
        loginButton: ".login-btn",
        passwordField: "#password"
    },
    contextEvents: {
        "authentication:signin:completed": "handleResponse"
    },
    modelEvents: {
        "change:authenticated": "render"
    },
    events: {
        "click @ui.loginButton": "signin"
    },

    initialize: function(){
        debug( '#initialize' );
    },

    serializeData: function(){
        const data = this.model.toJSON();
        data.permissions = this.permissions.toJSON();

        return data;
    },

    onDestroy: function(){
        this._destroyed = true;
    },

    handleResponse: function(){
        if( !this._destroyed ){
            this.ui.loginButton.prop( 'disabled', false );
            this.ui.loginButton.button( 'reset' );
            this.ui.passwordField.val( '' );
        }
    },

    signin: function( event ){
        debug( '#signin' );
        this.ui.loginButton.prop( 'disabled', 'disabled' );
        this.ui.loginButton.button( 'sending' );
        this.dispatch( "authentication:signin:requested", {
            email: this.$( "#email" ).val(),
            password: this.$( "#password" ).val()
        } );
    }
} );
