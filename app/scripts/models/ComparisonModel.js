'use strict';
var debug = require( 'bows' )( 'dpac:models' );

module.exports = Backbone.NestedModel.extend( {

    initialize : function(){
        debug( 'AggregateComparisonModel#initialize' );
        Backbone.Select.Me.applyTo( this );
    },

    isActive : function(){
        return this.get( 'comparison.active' );
    }

} );
