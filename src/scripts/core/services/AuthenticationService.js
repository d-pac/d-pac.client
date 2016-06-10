'use strict';
var NestedModel = require( 'backbone-nested-model' );
var _ = require( 'lodash' );

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
        attrs.user = _.get(raw, ['included', 0], false);
        attrs.authenticated = !!_.get(raw, 'data', false);
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
            success: function(){
                this.dispatch( 'authentication:status:completed', {
                    authenticated: this.isAuthenticated()
                } );
            }.bind( this ),
            error: function(){
                this.reset();
                this.dispatch( 'authentication:status:completed', {
                    authenticated: this.isAuthenticated()
                } );
            }.bind( this )
        } );
    },

    signin: function( creds ){
        debug( '#signin', creds );
        this.save( creds, {
            success: function(){
                this.dispatch( 'authentication:signin:completed', {
                    authenticated: this.isAuthenticated()
                } );
            }.bind( this ),
            error: function( model,
                             response,
                             options ){
                this.reset();
                this.dispatch( 'authentication:signin:completed', {
                    authenticated: this.isAuthenticated()
                } );
            }.bind( this )
        } );
    },

    signout: function(){
        debug( '#signout' );
        this.destroy( {
            success: function( response ){
                this.reset();
                this.dispatch( 'authentication:signout:completed' );
            }.bind( this ),
            error: function( response ){
                this.reset();
                this.dispatch( 'authentication:signout:completed' );
            }.bind( this )
        } );
        this.reset();
    },

    reset: function(){
        this.clear({silent: true});
        this.set(this.defaults);
    }

} );

