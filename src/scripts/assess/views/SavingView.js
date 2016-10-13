'use strict';
const {ItemView} = require('backbone.marionette');
const debug = require( 'debug' )( 'dpac:assess.views', '[SavingView]' );
const tpl = require('./templates/SavingView.hbs');

module.exports = ItemView.extend({
    template : tpl,
    className : "col-md-8 col-md-offset-2 column",
    initialize : function(){
        debug("#initialize");
    }
});
