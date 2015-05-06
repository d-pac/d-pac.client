'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[LoginView]' );
var tpl = require( './templates/Login.hbs' );

module.exports = Marionette.LayoutView.extend( {
    template: tpl,
    ui: {
        loginButton: ".login-btn",
        passwordField: "#password"
    },
    contextEvents: {
        "authentication:signin:completed": "handleResponse"
    },
    events: {
        "click @ui.loginButton": "signin"
    },

    initialize: function(){
        debug( '#initialize' );
    },

    handleResponse: function(){
        this.ui.loginButton.prop('disabled', false);
        this.ui.loginButton.button('reset');
        this.ui.passwordField.val( '' );
    },

    signin: function( event ){
        debug( '#signin' );
        this.ui.loginButton.prop('disabled', 'disabled');
        this.ui.loginButton.button('sending');
        this.dispatch( "authentication:signin:requested", {
            email: this.$( "#email" ).val(),
            password: this.$( "#password" ).val()
        } );
    }
} );
