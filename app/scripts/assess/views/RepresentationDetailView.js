'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationDetailView]' );
var imageTpl = require( './templates/media/image.hbs' );
var pdfTpl = require( './templates/media/pdf.hbs' );
var htmlTpl = require( './templates/media/html.hbs' );
var templates = {
    "image/png": imageTpl,
    "image/jpeg": imageTpl,
    "application/pdf": pdfTpl,
    "text/html": htmlTpl,
    "image/svg+xml": imageTpl
};
var defaultTpl = templates[ 'text/html' ];

module.exports = Marionette.ItemView.extend( {
    className: "row",
    getTemplate: function(){
        var document = this.model.get( "document" );
        if( document ){
            return templates[ document.mimeType ] || defaultTpl;
        }
        debug( this.model );
        return defaultTpl;
    },

    initialize: function( opts ){
        debug( "#initialize" );
    }
} );
