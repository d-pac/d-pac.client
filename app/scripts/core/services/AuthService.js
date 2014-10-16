'use strict';

var debug = require( 'debug' )( 'dpac:core.services', '[AuthService]' );
var createServiceResponse = require( '../helpers/createServiceResponse' );
var sessionCount = 0;

module.exports = Backbone.NestedModel.extend( {

    url           : '/me/session',
    idAttribute   : "_id",
    wiring        : ["pendingRequests"],
    defaults      : {
        loggedin : false
    },
    contextEvents : {
        "backbone:sync:error" : "getStatus"
    },

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

    getStatus : function(){
        debug( '#getStatus' );
        this.unset( "user" );
        this.fetch( {
            success : function( data ){
                var user = this.get( "user" );
                if( user ){
                    this.set( "_id", user._id );
                    this.set( "loggedin", true );
                }else{
                    this.unset( "_id" );
                    this.set( "loggedin", false );
                }

                this.broadcast( 'AuthService:getStatus:succeeded', createServiceResponse( false, data ) );
            }.bind( this )
        } );
    },
    signin    : function( creds ){
        debug( '#signin' );
        this.save( creds, {
            success : function( data ){
                this.set( "_id", this.get( "user._id" ) );
                this.set( "loggedin", true );
                this.broadcast( 'AuthService:signin:succeeded', createServiceResponse( false, data ) )
            }.bind( this ),
            error   : function( model,
                                response,
                                options ){
                this.clear();
                this.broadcast( 'AuthService:signin:failed', createServiceResponse( response ) );
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
        this.destroy( {
            success : function( data ){
                this.clear();
                this.broadcast( 'AuthService:signout:succeeded', createServiceResponse( false ) );
            }.bind( this )
        } );
    }
} );

