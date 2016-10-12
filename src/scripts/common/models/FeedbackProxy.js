'use strict';
const {Model} = require( 'backbone' );
const debug = require( 'debug' )( 'dpac:assess.models', '[FeedbackProxy]' );
const teardown = require( '../../common/mixins/teardown' );
module.exports = Model.extend( {
    idAttribute: "_id",

    defaults: {
        _rid: undefined,
        author: undefined,
        phase: undefined,
        document: undefined,
        positive: undefined,
        negative: undefined
    },

    initialize: function(){
        debug( '#initialize', this );
        //const self = this;
        //this.on( 'change:body', function(){
        //    self.save( self.changedAttributes(), { patch: true } );
        //} );
    },

    parse: function( raw ){
        return (raw.data)? raw.data : raw;
    },

    update: function( attrs ){
        this.save( attrs, { patch: true } );
    }

} );
teardown.model.mixin( module.exports );

