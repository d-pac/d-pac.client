'use strict';
const {CompositeView} = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:uploads.views', '[UploadsOverview]' );
const tpl = require( './templates/UploadsOverview.hbs' );
const ItemView = require( './UploadsOverviewItem' );

module.exports = CompositeView.extend( {
    template: tpl,
    childView: ItemView,
    childViewContainer: 'tbody',

    childEvents: {
        "file:selected": function( view ){
            this.dispatch( "uploads:file:selected" );
        },
        "file:deselected": function( view ){
            this.dispatch( "uploads:file:deselected" );
        }
    },

    initialize: function(){
        debug( '#initialize' );
    },

} );
