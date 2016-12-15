'use strict';

const {defaultsDeep} = require( 'lodash' );
const {ItemView, Controller} = require( 'backbone.marionette' );
// const debug = require( 'debug' )( 'dpac:common.views', '[MediaViewFactory]' );
const consts = {
    html: 'html',
    image: 'image',
    pdf: 'pdf',
    audio: 'audio',
    video: 'video'
};

const mediaByMime = {
    "text/html": consts.html,
    "image/png": consts.image,
    "image/jpeg": consts.image,
    "image/svg+xml": consts.image,
    "image/gif": consts.image,
    "application/pdf": consts.pdf,
    "audio/mp4": consts.audio,
    "audio/mp3": consts.audio,
    "audio/mpeg": consts.audio,
    "video/mp4": consts.video,
    "video/mpeg": consts.video,
};

const mediaViews = {};
mediaViews[ consts.html ] = {
    viewClass: ItemView.extend( {} ),
    tpl: require( '../views/templates/media/html.hbs' )
};
mediaViews[ consts.image ] = {
    viewClass: ItemView.extend( {} ),
    tpl: require( '../views/templates/media/image.hbs' )
};
mediaViews[ consts.pdf ] = {
    viewClass: require('./PDFViewer'),
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

module.exports = Controller.extend( {
    permissions: undefined,
    getMediaView: function( representation,
                            settings ){
        if(!settings){
            settings={};
        }
        const mimeType = representation.get( 'document.mimeType' ) || 'text/html';
        const mediaType = mediaByMime[ mimeType ];
        const mediaView = mediaViews[ mediaType ];
        if( !mediaView ){
            throw new Error( 'incorrect-media-type' );
        }
        return new mediaView.viewClass( {
            template: mediaView.tpl,
            model: representation,
            options: defaultsDeep( {}, settings[ mediaType ], mediaView.defaults ),
            permissions: this.permissions
        } );
    }
} );
