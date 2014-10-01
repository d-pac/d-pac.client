'use strict';

var debug = require( 'debug' )( 'dpac:core.services', '[AuthService]' );
var createServiceResponse = require( '../helpers/createServiceResponse' );

module.exports = Backbone.Model.extend( {

    initialize : function(){
        debug( '#initialize' );
    },

    broadcast : function( event,
                          data ){
        this.trigger( event, data );
        this.dispatch( event, data );
    },

    getStatus : function(){
        debug( '#getStatus' );
        this.fetch( {
            success : function( data ){
                this.broadcast( 'AuthService:getStatus:succeeded', createServiceResponse( false ) );
            }.bind( this ),
            error   : function( model,
                                response,
                                options ){
                this.broadcast( 'AuthService:getStatus:failed', createServiceResponse( response ) );
            }.bind( this )
        } );
    },
    signin    : function( creds ){
        debug( '#signin' );
        this.save( creds, {
            success : function( data ){
                this.broadcast( 'AuthService:signin:succeeded', createServiceResponse( false, data ) )
            }.bind( this ),
            error   : function( model,
                                response,
                                options ){
                this.broadcast( 'AuthService:signin:failed', createServiceResponse( response ) );
            }.bind( this )
        } );
    },
    signout   : function(){
        debug( '#signout' );
        this.destroy( {
            success : function( data ){
                this.clear();
                this.broadcast( 'AuthService:signout:succeeded', createServiceResponse( false ) );
            }.bind( this ),
            error   : function( model,
                                response,
                                options ){
                this.broadcast( 'AuthService:signout:failed', createServiceResponse( response ) );
            }.bind( this )
        } );
    }
} );

