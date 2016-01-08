'use strict';
var NestedModel = require( 'backbone-nested-model' );
var debug = require( 'debug' )( 'dpac:assess.models', '[FeedbackProxy]' );
var teardown = require( '../../common/mixins/teardown' );
module.exports = NestedModel.extend( {
    idAttribute: "_id",

    defaults: {
        _rid: undefined,
        author: undefined,
        document: undefined,
        proscons: {
            positive: undefined,
            negative: undefined
        }
    },

    initialize: function(){
        debug( '#initialize', this );
        //var self = this;
        //this.on( 'change:body', function(){
        //    self.save( self.changedAttributes(), { patch: true } );
        //} );
    },

    parse: function(raw){
        return raw.data;
    }

} );
teardown.model.mixin( module.exports );

