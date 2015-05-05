'use strict';

var debug = require( 'debug' )( 'dpac:core.services', '[AuthService]' );
var createServiceResponse = require( '../helpers/createServiceResponse' );
var sessionCount = 0;

module.exports = Backbone.NestedModel.extend( {

    url: '/session',
    idAttribute: "_id",
    wiring: [ "pendingRequests" ],
    defaults: {
        authenticated: false
    },
    contextEvents: {
        "authentication:status:requested": "getStatus",
        "authentication:signin:requested": "signin"
    },

    initialize: function(){
        debug( '#initialize' );
    },

    parse: function( raw ){
        return {
            user: raw.data,
            authenticated: !!raw.data
        };
    },

    broadcast: function( event,
                         data ){
        this.trigger( event, data );
        this.dispatch( event, data );
    },

    isAuthenticated: function(){
        return this.get( 'authenticated' );
    },

    getStatus: function(){
        debug( '#getStatus' );
        this.unset( "user" );
        this.fetch( {
            success: function( response ){
                this.broadcast( 'authentication:status:completed' );
            }.bind( this ),
            error: function(){
                this.clear();
                this.broadcast( 'authentication:status:completed' );
            }.bind( this )
        } );
    },

    signin: function( creds ){
        debug( '#signin', creds );
        this.save( creds, {
            success: function( response ){
                this.broadcast( 'authentication:signin:succeeded', response.data );
            }.bind( this ),
            error: function( model,
                             response,
                             options ){
                this.clear();
                this.broadcast( 'authentication:signin:failed' );
            }.bind( this )
        } );
    },

    signout: function(){
        debug( '#signout' );
        this.broadcast( 'AuthService:signout:requested' );
        this.destroy( {
            success: function( response ){
                this.broadcast( 'AuthService:signout:succeeded' );
            }.bind( this )
        } );
        this.clear();
    }

} );

