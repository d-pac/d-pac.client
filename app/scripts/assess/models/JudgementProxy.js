'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[JudgementModel]' );
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        assessment     : undefined,
        assessor       : undefined,
        comparison     : undefined,
        passed         : undefined,
        rank           : undefined,
        representation : undefined, //representation obj, not model
        note           : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id );
    }
} );
