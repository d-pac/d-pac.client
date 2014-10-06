'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationsView]' );
var tpl = require('./templates/RepresentationsView.hbs');

module.exports = Marionette.CollectionView.extend({
    template : tpl,
    initialize : function(){
        debug("#initialize");
    }
});
