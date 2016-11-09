'use strict';
const { ItemView } = require( 'backbone.marionette' );

const debug = require( 'debug' )( 'dpac:common.views', '[PDFViewer]' );
module.exports = ItemView.extend( {

    onRender: function(){
        const intervalId = setInterval( ()=>{
            debug( 'PDF refreshed' );
            //refresh, probably 204 was returned
            this.$( '.media-pdf' ).attr( 'src', this.$( '.media-pdf' ).attr( 'src' ) );
        }, 5000 );
        this.$( '.media-pdf' ).on( 'load', function(){
            debug( 'PDF loaded' );
            clearInterval( intervalId );
        } );
    }
} );
