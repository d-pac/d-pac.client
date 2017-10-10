'use strict';
const {LayoutView} = require( 'backbone.marionette' );

const debug = require( 'debug' )( 'dpac:results.views', '[RepresentationDetails]' );
const tpl = require( './templates/RankingDetails.hbs' );

module.exports = LayoutView.extend( {
    mediaViewFactory: undefined,
    regions: {
        'mediaplayer': '.media-viewer'
    },

    template: tpl,
    initialize: function(){
        debug( '#initialize' );

        this.model = this.collection.selected;
    },

    onRender: function(){
        debug( '#onRender' );

        ga('send', 'event', 'results', 'view representation', this.model.get('anonymized'));

        const view = this.mediaViewFactory.getMediaView( this.model, {
            video: {
                height: 300,
                aspectratio: null
            }
        } );
        this.mediaplayer.show( view );
    }

} );
