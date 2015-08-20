'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationDetailView]' );
var imageTpl = require( './templates/media/image.hbs' );
var viewerjsTpl = require( './templates/media/viewerjs.hbs' );
var htmlTpl = require('./templates/media/html.hbs');

var templates = {
    "image/png": imageTpl,
    "image/jpeg": imageTpl,
    "application/pdf": viewerjsTpl,
    "text/html": htmlTpl
};

module.exports = Marionette.ItemView.extend( {
    className: "row",
    getTemplate: function(){
        var type = this.model.get( "document" ).mimeType;
        return templates[ type ] || templates['image/png'];
    },

    initialize: function( opts ){
        debug( "#initialize" );
    }
} );
