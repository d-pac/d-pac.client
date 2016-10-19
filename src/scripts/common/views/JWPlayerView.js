'use strict';
const {defaults} = require( 'lodash' );
const {ItemView} = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:common.views', '[JWPlayerView]' );
module.exports = ItemView.extend( {
    permissions: undefined,

    initialize: function( config ){
        debug( '#Initialize', arguments );
        this.playerOpts = config.options;
        this.permissions = config.permissions;
    },

    onRender: function(){
        debug( '#onRender' );
        if( !this.permissions.isHidden( 'jwplayer.view' ) ){
            setTimeout( ()=>{
                const playerInstance = window.jwplayer( "jwplayer-" + this.model.get( '_id' ) );
                playerInstance.setup( defaults( {}, this.playerOpts, {
                    file: this.model.get( 'document.href' ),
                    title: 'Basic Video Embed',
                    autostart: false,
                    controls: true,
                    primary: 'html5'
                } ) );
            }, 500 );
        }
    }
} );
