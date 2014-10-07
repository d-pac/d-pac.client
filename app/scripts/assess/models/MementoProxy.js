'use strict';
var debug = require( 'debug' )( 'dpac:assess.models', '[MementoProxy]' );

module.exports = Backbone.NestedModel.extend( {
    initialize : function( attrs ){
        debug( '#initialize' );
        Backbone.Select.Me.applyTo( this );
    }
} );
