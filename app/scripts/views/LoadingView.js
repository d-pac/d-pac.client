'use strict';

var debug = require( 'bows' )( 'dpac:views' );
var tpl = require('./templates/Loading.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(opts){
        debug("LoadingView#initialize");
    }
});
