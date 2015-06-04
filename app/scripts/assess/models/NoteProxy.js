'use strict';
var NestedModel = require( 'backbone-nested-model' );
var debug = require( 'debug' )( 'dpac:assess.models', '[NoteProxy]' );
var teardown = require( '../mixins/teardown' );
module.exports = NestedModel.extend( {
    idAttribute: "_id",

    defaults: {
        _rid: undefined,
        author: undefined,
        document: undefined,
        body: undefined
    },

    initialize: function(){
        debug( '#initialize', this.id || '<new>' );
        var self = this;
        this.on( 'change:body', function(){
            self.save( self.changedAttributes(), { patch: true } );
        } );
    }

} );
teardown.model.mixin( module.exports );

