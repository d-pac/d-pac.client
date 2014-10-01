'use strict';

var debug = require( 'debug' )( 'dpac:models', '[AssessmentModel]' );
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        title       : undefined,
        description : undefined,
        state       : undefined,
        phases      : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id );
        Backbone.Select.Me.applyTo( this );
    }
} );
