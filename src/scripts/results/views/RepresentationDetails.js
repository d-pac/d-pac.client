'use strict';
var Marionette = require( 'backbone.marionette' );

var debug = require( 'debug' )( 'dpac:results.views', '[RepresentationDetails]' );
var tpl = require( './templates/RepresentationDetails.hbs' );

module.exports = Marionette.LayoutView.extend( {
    mediaViewFactory: undefined,
    regions: {
        'mediaplayer': '.representation-detail'
    },

    template: tpl,
    initialize: function(){
        debug( '#initialize' );

        this.model = this.collection.selected;
    },

    onRender: function(){
        debug( '#onRender' );
        var view = this.mediaViewFactory.getMediaView( this.model );
        this.mediaplayer.show( view );
    }

} );
