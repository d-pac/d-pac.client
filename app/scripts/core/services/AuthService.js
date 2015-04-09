'use strict';

var debug = require( 'debug' )( 'dpac:core.services', '[AuthService]' );
var createServiceResponse = require( '../helpers/createServiceResponse' );
var sessionCount = 0;

module.exports = Backbone.NestedModel.extend( {

    url           : '/session',
    idAttribute   : "_id",
    wiring        : ["pendingRequests"],
    defaults      : {
        loggedin : false
    },
    contextEvents : {
        "backbone:sync:error" : "requestErrorHandler"
    },
    _isRequesting : false,

    initialize : function(){
        debug( '#initialize' );
        this.getStatus();
    },

    broadcast : function( event,
                          data ){
        this.trigger( event, data );
        this.dispatch( event, data );
    },

    isLoggedin : function(){
        return this.get( 'loggedin' );
    },

    requestErrorHandler : function(){
        if(!this._isRequesting){
            this.getStatus();
        }else{
            this._isRequesting = false;
        }
    },

    getStatus : function(){
        debug( '#getStatus' );
        if(! this._isRequesting){
            this._isRequesting = "status";
            this.unset( "user" );
            this.fetch( {
                success : function( response ){
                    this._isRequesting = false;
                    var user = this.get( "user" );
                    if( user ){
                        this.set( "_id", user._id );
                        this.set( "loggedin", true );
                    }else{
                        this.unset( "_id" );
                        this.set( "loggedin", false );
                    }

                    this.broadcast( 'AuthService:getStatus:succeeded', response.data );
                }.bind( this )
            } );
        }
    },
    signin    : function( creds ){
        debug( '#signin' );
        this._isRequesting = "signin";
        this.save( creds, {
            success : function( response ){
                this._isRequesting = false;
                this.set( "_id", this.get( "user._id" ) );
                this.set( "loggedin", true );
                this.broadcast( 'AuthService:signin:succeeded', response.data )
            }.bind( this ),
            error   : function( model,
                                response,
                                options ){
                this.clear();
                this.broadcast( 'AuthService:signin:failed', createServiceResponse( response.errors ) );
            }.bind( this )
        } );
    },
    signout   : function(){
        debug( '#signout' );
        this.broadcast( 'AuthService:signout:requested' );
        if( this.pendingRequests.isEmpty() ){
            this._signout();
        }else{
            this.pendingRequests.once( "requests:pending:empty", this._signout.bind( this ) );
        }
    },

    _signout : function(){
        this._isRequesting = "signout";
        this.destroy( {
            success : function( response ){
                this._isRequesting = false;
                this.clear();
                this.broadcast( 'AuthService:signout:succeeded' );
            }.bind( this )
        } );
    }
} );

