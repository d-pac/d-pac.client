'use strict';
var _ = require( 'underscore' );
var Backbone = require( 'backbone' );
var debug = require( 'debug' )( 'dpac:assess.models', '[CurrentSelectionModel]' );

var teardown = require( '../mixins/teardown' );

module.exports = Backbone.Model.extend( {
    defaults : {
        comparison: undefined,
        assessment: undefined,
        representations: undefined,
        phases: undefined
    },

    getRepresentation : function(orderId){
        var repId = this.get("comparison" ).get("representations" )[orderId];
        var rep = this.get("representations" ).get(repId);
        return rep;
    }
} );
