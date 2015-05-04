'use strict';

var debug = require( 'debug' )( 'dpac:core.services', '[AuthService]' );
var createServiceResponse = require( '../helpers/createServiceResponse' );
var sessionCount = 0;

module.exports = Backbone.NestedModel.extend( {

    url           : '/session',
    idAttribute   : "_id",
    wiring        : ["pendingRequests"],
    defaults      : {
        loggedin : false,
        isRequesting: false
    },
    contextEvents : {
        "backbone:sync:error" : "requestErrorHandler",
        "login:status:requested": "getStatus"
    },

    initialize : function(){
        debug( '#initialize' );
    },

    parse : function(raw){
        return {
            user: raw.data,
            loggedin : !!raw.data,
            isRequesting : false
        };
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
        if(!this.isRequesting){
            this.getStatus();
        }else{
            this.set('isRequesting', false);
        }
    },

    getStatus : function(){
        debug( '#getStatus' );
        if(! this.isRequesting){
            this.set('isRequesting', "status");
            this.unset( "user" );
            this.fetch( {
                success : function( model ){
                    this.broadcast( 'AuthService:getStatus:succeeded' );
                }.bind( this )
            } );
        }
    },
    signin    : function( creds ){
        debug( '#signin' );
        this.set('isRequesting', "signin");
        this.save( creds, {
            success : function( response ){
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
        this.set('isRequesting', "signout");
        this.destroy( {
            success : function( response ){
                this.clear();
                this.broadcast( 'AuthService:signout:succeeded' );
            }.bind( this )
        } );
    }
} );

