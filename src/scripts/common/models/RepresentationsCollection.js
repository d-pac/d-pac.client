'use strict';
const {Collection} = require( 'backbone' );
const debug = require( 'debug' )( 'dpac:common.collections', '[RepresentationsCollection]' );
const teardown = require( '../../common/mixins/teardown' );
const selectable = require( '../../common/mixins/selectable' );
const ModelClass = require( '../models/RepresentationProxy' );

module.exports = Collection.extend( {
    url: '/representations',
    model: ModelClass,

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( raw ){
        return raw.data;
    },

    fetchForAssessment: function( model ){
        debug('#fetchForAssessment');
        this.fetch( {
            data: { filter: JSON.stringify( { assessment: model.id } ) },
            reset: true
        } );
    },

    fetchForUser: function(){
        debug('#fetchForUser');
        this.fetch( {
            url: '/user/representations',
            reset: true
        } );
    }

} );
teardown.collection.mixin( module.exports );
selectable.collection.mixin( module.exports );
