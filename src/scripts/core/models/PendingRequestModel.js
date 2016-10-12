'use strict';
const {Model} = require('backbone');

const debug = require( 'debug' )( 'dpac:core', '[PendingRequestModel]' );
module.exports = Model.extend({
    defaults : {
        uuid : undefined,
        url : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
    }
});
