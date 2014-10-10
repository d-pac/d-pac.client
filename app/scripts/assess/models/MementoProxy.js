'use strict';
var debug = require( 'debug' )( 'dpac:assess.models', '[MementoProxy]' );

module.exports = Backbone.Model.extend( {
    parser : undefined,

    initialize : function( attrs ){
        debug( '#initialize' );
        Backbone.Select.Me.applyTo( this );
    },

    parse : function(response){
        return this.parser.parse(response);
    },

    get: function (attr) {
      if (typeof this["_get_" + attr] == 'function')
      {
        return this["_get_" + attr]();
      }

      return Backbone.Model.prototype.get.call(this, attr);
    },

    _get_completed : function(){
        return this.get('comparison' ).get('completed');
    }
} );
