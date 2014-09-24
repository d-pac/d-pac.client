'use strict';
var debug = require( 'debug' )( 'dpac:models', '[ComparisonModel]' );

module.exports = Backbone.NestedModel.extend( {

    initialize : function(){
        debug( '#initialize' );
    },

    isActive : function(){
        return this.get( 'comparison.active' );
    }

} );
