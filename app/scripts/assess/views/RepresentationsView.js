'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationsView]' );
var tpl = require('./templates/RepresentationsView.hbs');

module.exports = Marionette.CollectionView.extend({
    template : tpl,
    className : "row",

    initialize : function(){
        debug("#initialize");
    }
});
