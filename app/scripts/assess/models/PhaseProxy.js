'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[PhaseProxy]' );
var teardown = require('../mixins/teardown');
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        type : undefined,
        label : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id );
        Backbone.Select.Me.applyTo( this );
        teardown.model.mixin(this);
    }
} );
