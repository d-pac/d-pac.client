'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[RepresentationsView]' );

module.exports = Marionette.CollectionView.extend({
    className : "row",

    initialize : function(){
        debug("#initialize");
    }
});
