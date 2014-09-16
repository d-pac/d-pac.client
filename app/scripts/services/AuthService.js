'use strict';
var debug = require( 'bows' )( 'dpac:services' );
var createServiceResponse = require( '../helpers/createServiceResponse' );

module.exports = Marionette.Controller.extend( {

    initialize : function(){
        debug( 'AuthService#initialize' );
        this._setupSecurity();
        this.on( 'all', this.dispatch );
    },

    _setupSecurity : function(){
        var backboneSync = Backbone.sync;
        Backbone.sync = function(method, model, options){
            if (!options.crossDomain) {
              options.crossDomain = true;
            }

            if (!options.xhrFields) {
              options.xhrFields = {withCredentials:true};
            }

            options.beforeSend = function(xhr){
                xhr.setRequestHeader('x-csrf-token', this._csrf);
            };
            return backboneSync(method, model, options);
        };
    },

    getStatus : function(){
        debug( 'AuthService#getStatus' );
        $.ajax( {
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

