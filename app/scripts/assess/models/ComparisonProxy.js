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
        var messages = this.get('messages');
        return messages && messages.length;
    }

} );
teardown.model.mixin( module.exports );
