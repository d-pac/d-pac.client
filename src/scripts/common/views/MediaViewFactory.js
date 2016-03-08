'use strict';

var _ = require( 'lodash' );
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:common.views', '[MediaViewFactory]' );
var consts = {
    html: 'html',
    image: 'image',
    pdf: 'pdf',
    audio: 'audio',
    video: 'video'
};

var mediaByMime = {
    "text/html": consts.html,
    "image/png": consts.image,
    "image/jpeg": consts.image,
    "image/svg+xml": consts.image,
    "application/pdf": consts.pdf,
    "audio/mp4": consts.audio,
    "audio/mp3": consts.audio,
    "audio/mpeg": consts.audio,
    "video/mp4": consts.video,
    "video/mpeg": consts.video,
};

var mediaViews = {};
mediaViews[ consts.html ] = {
    viewClass: Marionette.ItemView.extend( {} ),
    tpl: require( '../views/templates/media/html.hbs' )
};
mediaViews[ consts.image ] = {
    viewClass: Marionette.ItemView.extend( {} ),
    tpl: require( '../views/templates/media/image.hbs' )
};
mediaViews[ consts.pdf ] = {
    viewClass: Marionette.ItemView.extend( {} ),
    tpl: require( '../views/templates/media/pdf.hbs' )
};
mediaViews[ consts.audio ] = {
    viewClass: require( './JWPlayerView' ),
    tpl: require( '../views/templates/media/video.hbs' ),
    defaults: {
        width: '100%',
        height: 180
    }
};

mediaViews[ consts.video ] = {
    viewClass: require( './JWPlayerView' ),
    tpl: require( '../views/templates/media/video.hbs' ),
    defaults: {
        width: '100%',
        stretch: 'uniform',
        aspectratio: "16:9"
    }
};

module.exports = Marionette.Controller.extend( {
    permissions: undefined,
    getMediaView: function( representation,
                            settings ){
        if(!settings){
            settings={};
        }
        var mimeType = representation.get( 'document.mimeType' ) || 'text/html';
        var mediaType = mediaByMime[ mimeType ];
        var mediaView = mediaViews[ mediaType ];
        if( !mediaView ){
            throw new Error( 'incorrect-media-type' );
        }
        return new mediaView.viewClass( {
            template: mediaView.tpl,
            model: representation,
            options: _.defaultsDeep( {}, settings[ mediaType ], mediaView.defaults ),
            permissions: this.permissions
        } );
    }
} );
