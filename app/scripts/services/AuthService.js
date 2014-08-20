'use strict';
var debug = require( 'bows' )( 'dpac:services' );
var createServiceResponse = require('../helpers/createServiceResponse');

module.exports = Marionette.Controller.extend( {
    url    : "http://localhost:3020/api/session",
    initialize : function(){
        debug( 'AuthService#initialize' );
        this.on( 'all', this.dispatch );
    },

    getStatus : function(){
        debug( 'AuthService#getStatus' );
        $.ajax( {
            url     : this.url,
            type    : 'GET',
            success : function( data ){
                this.trigger( 'AuthService:getStatus:completed', createServiceResponse( false ) );
            }.bind( this ),
            error   : function( err ){
                console.log( err );
                this.trigger( 'AuthService:getStatus:completed', createServiceResponse( err ) );
            }.bind( this )
        } );
    },
    signin    : function( creds ){
        debug( 'AuthService#signin' );
        $.ajax( {
            url      : this.url,
            type     : 'POST',
            dataType : 'json',
            data     : creds,
            success  : function( data ){
                this._csrf = data._csrf;
                this.trigger( 'AuthService:signin:completed', createServiceResponse( false ) );
            }.bind( this ),
            error    : function( err ){
                this.trigger( 'AuthService:signin:completed', createServiceResponse( err ) );
            }.bind( this )
        } );
    },
    signout   : function(){
        debug( 'AuthService#signout' );
        $.ajax( {
            url     : this.url,
            type    : 'DELETE',
            success : function( data ){
                this.trigger( 'AuthService:signout:completed', createServiceResponse( false ) );
            }.bind( this ),
            error   : function( err ){
                this.trigger( 'AuthService:signout:completed', createServiceResponse( err ) );
            }.bind( this )
        } );
    }
} );

