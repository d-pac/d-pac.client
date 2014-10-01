'use strict';
var debug = require( 'debug' )( 'dpac:assess.models', '[AggregateModel]' );

module.exports = Backbone.NestedModel.extend( {
    phases           : undefined,
    assessments      : undefined,
    representations  : undefined,
    judgements       : undefined,
    comparison       : undefined,
    createComparison : undefined,

    initialize : function( attrs ){
        debug( '#initialize' );
        Backbone.Select.Me.applyTo( this );
    },

    parse : function( response,
                      options ){
        console.log( response );
        this.assessments.add( response.assessment );
        this.phases.add( response.phases );
        this.representations.add( response.representations );
        this.judgements.add( response.judgements );
        this.comparison = this.createComparison(response.comparison);
    }
} );
