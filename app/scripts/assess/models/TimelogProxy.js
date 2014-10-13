'use strict';

var debug = require( 'debug' )( 'dpac:assess', '[TimelogProxy]' );
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    url      : '/timelogs',
    defaults : {
        comparison : undefined, //{Comparison.id}
        type       : undefined, //{Phase.id}
        times      : [] //{[{ begin: {Date}, end : {Date}}]}
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
        Backbone.Select.Me.applyTo( this );
    }
} );
