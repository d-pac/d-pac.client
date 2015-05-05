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
        "authentication:signin:failed": "emptyPassword"
    },
    events: {
        "click @ui.loginButton": "signin"
    },

    initialize: function(){
        debug( '#initialize' );
    },

    emptyPassword: function(){
        this.ui.passwordField.val( '' );
    },

    signin: function( event ){
        debug( '#signin' );
        this.dispatch( "authentication:signin:requested", {
            email: this.$( "#email" ).val(),
            password: this.$( "#password" ).val()
        } );
        //this.authService.signin( {
        //    email    : this.$( "#email" ).val(),
        //    password : this.$( "#password" ).val()
        //} );
    }
} );
