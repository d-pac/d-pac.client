'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationDetailView]' );
var tpl = require('./templates/RepresentationDetailView.hbs');

module.exports = Marionette.ItemView.extend({
    host : undefined,

    template : tpl,
    className : "col-md-6 column",
    initialize : function(opts){
        debug("#initialize");
    },

    serializeData :function(){
        return {
            url : this.host + this.model.get('url'),
            id : this.model.id
        };
    }
});
