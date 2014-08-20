'use strict';

var debug = require( 'bows' )( 'dpac:views' );
var tpl = require( './templates/Login.hbs' );
var AlertView = require( './AlertView' );

module.exports = Marionette.LayoutView.extend( {
    template   : tpl,
    wiring     : [
        'authService'
    ],
    ui         : {
        loginButton : ".login-btn",
        passwordField : "#password"
    },
    regions    : {
        alertRegion : ".alert-region"
    },
    events     : {
        "click @ui.loginButton" : "signin"
    },
    initialize : function(){
        debug( 'LoginView#initialize' );
        this.listenTo( this.authService, 'AuthService:signin:completed', function( response ){
            if( response.failed ){
                this.ui.passwordField.val('');
                this.alertRegion.show( new AlertView( { message : response.failed.reason.message } ) );
            }
        } );
    },
    signin     : function( event ){
        debug( 'SIGN IN' );
        this.authService.signin( {
            email    : this.$( "#email" ).val(),
            password : this.$( "#password" ).val()
        } );
    }
} );
