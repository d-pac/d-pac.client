'use strict';
const NestedModel = require( 'backbone-nested-model' );
const debug = require( 'debug' )( 'dpac:assess.models', '[NoteProxy]' );
const teardown = require( '../../common/mixins/teardown' );
module.exports = NestedModel.extend( {
    idAttribute: "_id",

    defaults: {
        _rid: undefined,
        author: undefined,
        document: undefined,
        body: undefined
    },

    initialize: function(){
        debug( '#initialize', this );
        this.on( 'change:body', ()=>{
            this.save( this.changedAttributes(), { patch: true } );
        } );
    },

    parse: function(raw){
        return raw.data;
    }

} );
teardown.model.mixin( module.exports );

