'use strict';
const {LayoutView} = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationDetailView]' );
const tpl = require( './templates/RepresentationDetail.hbs' );

module.exports = LayoutView.extend( {

    mediaViewFactory: undefined,

    className: "row",
    template: tpl,
    regions: {
        'mediaplayer': '.representation-detail'
    },

    initialize: function( opts ){
        debug( "#initialize" );
    },

    onRender: function(){
        debug( '#onRender' );
        const view = this.mediaViewFactory.getMediaView( this.model );
        this.mediaplayer.show( view );
    }
} );
