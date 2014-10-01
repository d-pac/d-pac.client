'use strict';

var debug = require( 'debug' )( 'dpac:core.views', '[LoginView]' );
var tpl = require( './templates/Login.hbs' );
var AlertView = require( './AlertView' );
var getErrorMessage = require( '../helpers/getErrorMessage' );

module.exports = Marionette.LayoutView.extend( {
    template : tpl,
    wiring   : [
        'authService'
    ],
    ui       : {
        loginButton   : ".login-btn",
        passwordField : "#password"
    },
    regions  : {
        alertRegion : ".alert-region"
    },
    events   : {
        "click @ui.loginButton" : "signin"
    },

    initialize : function(){
        debug( '#initialize' );
        this.listenTo( this.authService, 'AuthService:signin:failed', function( err ){
            this.ui.passwordField.val( '' );
            this.alertRegion.show( new AlertView( { message : getErrorMessage( err ) } ) );
        } );
    },

    signin : function( event ){
        debug( '#signin' );
        this.authService.signin( {
            email    : this.$( "#email" ).val(),
            password : this.$( "#password" ).val()
        } );
    }
} );
