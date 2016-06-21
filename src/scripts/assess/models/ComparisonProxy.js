'use strict';
var Backbone = require( 'backbone' );

var debug = require( 'debug' )( 'dpac:assess.models', '[ComparisonProxy]' );

var teardown = require( '../../common/mixins/teardown' );

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
        completed: false,

        representations: undefined,
        data: undefined,
        messages: undefined
    },

    initialize: function(){
        debug( '#initialize', this.id || '<new>' );
    },

    parse: function(raw){
        debug("#parse", this, raw);
        if(this.collection){
            return this.collection.parser.parseModel(raw);
        }

        //model already removed from collection
        return raw.data;
    },

    update: function( attrs ){
        this.save( attrs, { patch: true } );
    },

    hasMessages: function(){
        const messages = this.get('messages');
        return !!messages && !!messages.length;
    }

} );
teardown.model.mixin( module.exports );
