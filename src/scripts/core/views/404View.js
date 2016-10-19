'use strict';
const tpl = require('./templates/404.hbs');
const {ItemView} = require('backbone.marionette');
const debug = require( 'debug' )( 'dpac:core.views', '[404View]' );

module.exports = ItemView.extend({
    template : tpl,

    initialize: function(){
        debug('#initialize');
    }
});
