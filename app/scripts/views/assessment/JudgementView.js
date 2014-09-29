'use strict';

var debug = require( 'debug' )( 'dpac:views', '[JudgementView]' );
var tpl = require('./templates/JudgementView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,

    initialize : function(){
        debug("#initialize");
    }
});
