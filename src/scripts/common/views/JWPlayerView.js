'use strict';
var _ = require( 'lodash' );
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:common.views', '[JWPlayerView]' );
module.exports = Marionette.ItemView.extend( {
    initialize: function( config ){
        debug( '#Initialize', arguments );
        this.playerOpts = config.options;
    },

    onRender: function(){
        debug( '#onRender' );
        setTimeout( function(){
            var playerInstance = window.jwplayer( "jwplayer-" + this.model.get( '_id' ) );
            playerInstance.setup( _.defaults( {}, this.playerOpts, {
                file: this.model.get( 'document.href' ),
                title: 'Basic Video Embed',
                autostart: false,
                controls: true,
                primary: 'html5'
            } ) );
        }.bind( this ), 500 );
    }
} );
