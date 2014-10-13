'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[AssessmentProxy]' );
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        title       : undefined,
        description : undefined,
        state       : undefined,
        phases      : []
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
        Backbone.Select.Me.applyTo( this );
    }
} );
