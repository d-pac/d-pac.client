'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationDetailView]' );
var tpl = require( './templates/RepresentationDetail.hbs' );

module.exports = Marionette.LayoutView.extend( {

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
        var view = this.mediaViewFactory.getMediaView( this.model );
        this.mediaplayer.show( view );
    }
} );
