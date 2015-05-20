'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationDetailView]' );
var imageTpl = require( './templates/media/image.hbs' );
var viewerjsTpl = require( './templates/media/viewerjs.hbs' );
var templates = {
    "image/png": imageTpl,
    "image/jpeg": imageTpl,
    "application/pdf": viewerjsTpl
};

module.exports = Marionette.ItemView.extend( {
    className: "row",
    getTemplate: function(){
        var type = this.model.get( "document" ).mimeType;
        console.log("Rendering template for", type);
        return templates[ type ];
    },

    initialize: function( opts ){
        debug( "#initialize" );
    }
    //
    //serializeData :function(){
    //    //todo: this needs to be refactored and moved
    //    var path = this.model.get('url');
    //    var url;
    //    if(path.charAt(0)==="/" && this.host.charAt(this.host.length-1) === "/"){
    //        url = this.host.substr(0, this.host.length-1) + path;
    //    }else{
    //        url = this.host + path;
    //    }
    //
    //    return {
    //        url : url
    //    };
    //}
} );
