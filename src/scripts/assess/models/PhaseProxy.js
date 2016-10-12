'use strict';
const {Model} = require('backbone');
const debug = require( 'debug' )( 'dpac:assess.models', '[PhaseProxy]' );
const teardown = require('../../common/mixins/teardown');
module.exports = Model.extend( {
    idAttribute : "_id",
    defaults    : {
        slug : undefined,
        label : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
    }
} );
teardown.model.mixin( module.exports );

