'use strict';

var debug = require( 'bows' )( 'dpac:models' );
module.exports = Backbone.Model.extend({
    initialize : function(){
        debug('<%= file.name %>#initialize');
    }
});
