'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[SeqView]' );
var tpl = require('./templates/SeqView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(){
        debug("#initialize");
    }
});
