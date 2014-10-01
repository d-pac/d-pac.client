'use strict';

var debug = require( 'debug' )( 'dpac:models', '[JudgementModel]' );
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        assessment     : undefined,
        assessor       : undefined,
        comparison     : undefined,
        passed         : undefined,
        rank           : undefined,
        representation : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id );
    }
} );
