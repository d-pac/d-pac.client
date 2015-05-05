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
        "authentication:signin:requested": "signin",
        "authentication:signout:requested": "signout"
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

    isAuthenticated: function(){
        return this.get( 'authenticated' );
    },

    getStatus: function(){
        debug( '#getStatus' );
        this.unset( "user" );
        this.fetch( {
            success: function( response ){
                this.dispatch( 'authentication:status:completed' );
            }.bind( this ),
            error: function(){
                this.clear();
                this.dispatch( 'authentication:status:completed' );
            }.bind( this )
        } );
    },

    signin: function( creds ){
        debug( '#signin', creds );
        this.save( creds, {
            success: function( response ){
                this.dispatch( 'authentication:signin:completed', response.data );
            }.bind( this ),
            error: function( model,
                             response,
                             options ){
                this.clear();
                this.dispatch( 'authentication:signin:completed' );
            }.bind( this )
        } );
    },

    signout: function(){
        debug( '#signout' );
        this.destroy( {
            success: function( response ){
                this.dispatch( 'authentication:signout:completed' );
            }.bind( this ),
            error: function( response ){
                this.clear();
                this.dispatch( 'authentication:signout:completed' );
            }.bind( this )
        } );
        this.clear();
    }

} );

