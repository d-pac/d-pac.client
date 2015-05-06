'use strict';
var Marionette = require('backbone.marionette');
var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationDetailView]' );
var tpl = require('./templates/RepresentationDetailView.hbs');

module.exports = Marionette.ItemView.extend({
    host : undefined,

    template : tpl,
    className : "col-sm-6 column",
    initialize : function(opts){
        debug("#initialize");
    },

    serializeData :function(){
        //todo: this needs to be refactored and moved
        var path = this.model.get('url');
        var url;
        if(path.charAt(0)==="/" && this.host.charAt(this.host.length-1) === "/"){
            url = this.host.substr(0, this.host.length-1) + path;
        }else{
            url = this.host + path;
        }

        return {
            url : url
        };
    }
});
