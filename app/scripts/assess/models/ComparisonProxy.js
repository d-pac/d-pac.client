'use strict';
var _ = require( 'underscore' );
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:assess.models', '[ComparisonProxy]' );

var teardown = require( '../mixins/teardown' );

module.exports = Backbone.Model.extend( {

    urlRoot: '/comparisons',
    idAttribute: "_id",
    defaults: {
        /**
         * {Assessment.id}
         */
        assessment: undefined,
        /**
         * {User.id}
         */
        assessor: undefined,
        /**
         * {Phase.id}
         */
        phase: undefined,

        /**
         * {Boolean}
         */
        completed: undefined,

        representations: undefined,
        data: undefined
    },

    initialize: function(){
        debug( '#initialize', this.id || '<new>' );
    },
    update: function( attrs ){
        this.save( attrs, { patch: true } );
    }

} );
teardown.model.mixin( module.exports );
