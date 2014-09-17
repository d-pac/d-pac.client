'use strict';
var debug = require( 'debug' )( 'dpac:models', '[ComparisonModel]' );

module.exports = Backbone.NestedModel.extend( {

    initialize : function(){
        debug( '#initialize' );
        Backbone.Select.Me.applyTo( this );
    },

    isActive : function(){
        return this.get( 'comparison.active' );
    }

} );
