'use strict';
var Backbone = require('backbone');
var debug = require( 'debug' )( 'dpac:assess.models', '[PhaseProxy]' );
var teardown = require('../mixins/teardown');
module.exports = Backbone.Model.extend( {
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

