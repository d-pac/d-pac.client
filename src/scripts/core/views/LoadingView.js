'use strict';

const debug = require( 'debug' )( 'dpac:core.views', '[LoadingView]' );
const tpl = require('./templates/Loading.hbs');
const {ItemView} = require('backbone.marionette');
module.exports = ItemView.extend({
    template : tpl,
    initialize : function(opts){
        debug("#initialize");
    }
});
