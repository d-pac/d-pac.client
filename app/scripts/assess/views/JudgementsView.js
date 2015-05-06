'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[JudgementsView]' );
var Marionette = require('backbone.marionette');
module.exports = Marionette.CollectionView.extend({
    className : "row",
    initialize : function(){
        debug("#initialize");
    }
});
