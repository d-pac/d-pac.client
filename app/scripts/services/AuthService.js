'use strict';
var debug = require( 'bows' )( 'dpac:services' );
var createServiceResponse = require( '../helpers/createServiceResponse' );

module.exports = Marionette.Controller.extend( {

    url        : "/session",

    initialize : function(){
        debug( 'AuthService#initialize' );
        this._setupSecurity();
        this.on( 'all', this.dispatch );
    },

    _setupSecurity : function(){
        //TODO: we'll need to move this
        $.ajaxPrefilter( function( options,
                                   originalOptions,
                                   jqXHR ){
            options.xhrFields = {
                withCredentials : true
            };
            if( this._csrf ){
                if( options.data ){
                    options.data += '&_csrf=' + this._csrf;
                }else{
                    options.data = '_csrf=' + this._csrf;
                }
            }
        }.bind( this ) );
    },

    getStatus : function(){
        debug( 'AuthService#getStatus' );
        $.ajax( {
            api     : true,
            url     : this.url,
            type    : 'GET',
            success : function( data ){
                this.trigger( 'AuthService:getStatus:succeeded', createServiceResponse( false ) );
            }.bind( this ),
            error   : function( err ){
                console.log( err );
                this.trigger( 'AuthService:getStatus:failed', createServiceResponse( err ) );
            }.bind( this )
        } );
    },
    signin    : function( creds ){
        debug( 'AuthService#signin' );
        $.ajax( {
            api      : true,
            url      : this.url,
            type     : 'POST',
            dataType : 'json',
            data     : creds,
            success  : function( data ){
                this._csrf = data._csrf;
                this.trigger( 'AuthService:signin:succeeded', createServiceResponse( false, data ) );
            }.bind( this ),
            error    : function( err ){
                console.log( err );
                this.trigger( 'AuthService:signin:failed', createServiceResponse( err ) );
            }.bind( this )
        } );
    },
    signout   : function(){
        debug( 'AuthService#signout' );
        $.ajax( {
            api     : true,
            url     : this.url,
            type    : 'DELETE',
            success : function( data ){
                delete this._csrf;
                this.trigger( 'AuthService:signout:succeeded', createServiceResponse( false ) );
            }.bind( this ),
            error   : function( err ){
                this.trigger( 'AuthService:signout:failed', createServiceResponse( err ) );
            }.bind( this )
        } );
    }
} );

