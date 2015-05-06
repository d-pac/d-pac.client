'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[SigninView]' );
var tpl = require( './templates/Signin.hbs' );
var Marionette = require('backbone.marionette');
module.exports = Marionette.LayoutView.extend( {
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

    onDestroy : function(){
        this._destroyed = true;
    },

    handleResponse: function(){
        if(! this._destroyed){
            this.ui.loginButton.prop('disabled', false);
            this.ui.loginButton.button('reset');
            this.ui.passwordField.val( '' );
        }
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
