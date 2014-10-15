'use strict';

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
