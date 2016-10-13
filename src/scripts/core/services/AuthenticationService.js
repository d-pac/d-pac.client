'use strict';
var NestedModel = require( 'backbone-nested-model' );
const { get } = require( 'lodash' );

var debug = require( 'debug' )( 'dpac:core.services', '[AuthenticationService]' );

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
        attrs.user = get( raw, [ 'included', 0 ], false );
        attrs.authenticated = !!get( raw, 'data', false );
        if( attrs.user ){
            attrs._id = attrs.user._id;
        }
        return attrs;
    },

    isAuthenticated: function(){
        return this.get( 'authenticated' );
    },

    getStatus: function(){
        debug( '#getStatus' );
        this.fetch( {
            success: ()=>{
                this.dispatch( 'authentication:status:completed', {
                    authenticated: this.isAuthenticated()
                } );
            },
            error: ()=>{
                this.reset();
                this.dispatch( 'authentication:status:completed', {
                    authenticated: this.isAuthenticated()
                } );
            }
        } );
    },

    signin: function( creds ){
        debug( '#signin', creds );
        this.save( creds, {
            success: ()=>{
                this.dispatch( 'authentication:signin:completed', {
                    authenticated: this.isAuthenticated()
                } );
            },
            error: ( model,
                     response,
                     options )=>{
                this.reset();
                this.dispatch( 'authentication:signin:completed', {
                    authenticated: this.isAuthenticated()
                } );
            }
        } );
    },

    signout: function(){
        debug( '#signout' );
        this.destroy( {
            success: ( response )=>{
                this.reset();
                this.dispatch( 'authentication:signout:completed' );
            },
            error: ( response )=>{
                this.reset();
                this.dispatch( 'authentication:signout:completed' );
            }
        } );
        this.reset();
    },

    reset: function(){
        this.clear( { silent: true } );
        this.set( this.defaults );
    }

} );

