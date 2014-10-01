'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[SeqModel]' );
module.exports = Backbone.Model.extend( {
    defaults : {
        value : -1
    },

    initialize : function(){
        debug( '#initialize', this.id );
    }
} );
