'use strict';

var debug = require( 'debug' )( 'dpac:views' );
var tpl = require('./templates/ComparisonView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(){
        debug("ComparisonView#initialize");
    }
});
