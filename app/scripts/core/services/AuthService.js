'use strict';
var NestedModel = require('backbone-nested-model');

var debug = require( 'debug' )( 'dpac:core.services', '[AuthService]' );
var createServiceResponse = require( '../helpers/createServiceResponse' );
var sessionCount = 0;

module.exports = NestedModel.extend( {

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
        var attrs = {};
        attrs.user = raw.data;
        attrs.authenticated = !!raw.data;
        if(attrs.user){
            attrs._id = attrs.user._id
        }
        return attrs;
    },

    isAuthenticated: function(){
        return this.get( 'authenticated' );
    },

    getStatus: function(){
        debug( '#getStatus' );
        this.fetch( {
            success: function(){
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
            success: function(){
                this.dispatch( 'authentication:signin:completed', {
                    authenticated: true
                } );
            }.bind( this ),
            error: function( model,
                             response,
                             options ){
                this.clear();
                this.dispatch( 'authentication:signin:completed', {
                    authenticated: false
                } );
            }.bind( this )
        } );
    },

    signout: function(){
        debug( '#signout' );
        this.destroy( {
            success: function( response ){
                this.clear();
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

