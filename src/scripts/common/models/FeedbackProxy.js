'use strict';
var Backbone = require( 'backbone' );
var debug = require( 'debug' )( 'dpac:assess.models', '[FeedbackProxy]' );
var teardown = require( '../../common/mixins/teardown' );
module.exports = Backbone.Model.extend( {
    idAttribute: "_id",

    defaults: {
        _rid: undefined,
        author: undefined,
        document: undefined,
        positive: undefined,
        negative: undefined
    },

    initialize: function(){
        debug( '#initialize', this );
        //var self = this;
        //this.on( 'change:body', function(){
        //    self.save( self.changedAttributes(), { patch: true } );
        //} );
    },

    parse: function( raw ){
        return raw.data;
    },

    update: function( attrs ){
        this.save( attrs, { patch: true } );
    }

} );
teardown.model.mixin( module.exports );

