'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[SavingView]' );
var tpl = require('./templates/SavingView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    className : "col-md-8 col-md-offset-2 column",
    initialize : function(){
        debug("#initialize");
    }
});
