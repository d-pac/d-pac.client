'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[LoginView]' );
var tpl = require( './templates/Login.hbs' );

module.exports = Marionette.LayoutView.extend( {
    template: tpl,
    wiring: [
        'authService'
    ],
    ui: {
        loginButton: ".login-btn",
        passwordField: "#password"
    },
    events: {
        "click @ui.loginButton": "signin"
    },

    initialize: function(){
        debug( '#initialize' );
        //todo: move to global error alert view
        this.listenTo( this.authService, 'authentication:signin:completed', function( err ){
            this.ui.passwordField.val( '' );
            //this.alertRegion.show( new AlertView( { message : getErrorMessage( err ) } ) );
        } );
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
