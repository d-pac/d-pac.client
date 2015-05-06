'use strict';
var Backbone = require('backbone');

var debug = require( 'debug' )( 'dpac:core', '[PendingRequestModel]' );
module.exports = Backbone.Model.extend({
    defaults : {
        uuid : undefined,
        url : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
    }
});
