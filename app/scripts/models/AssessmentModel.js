'use strict';

var debug = require( 'debug' )( 'dpac:models', '[AssessmentModel]' );
module.exports = Backbone.Model.extend( {
    defaults   : {
        title       : "",
        description : ""
    },
    initialize : function(){
        debug( '#initialize' );
        Backbone.Select.Me.applyTo( this );
    }
} );
