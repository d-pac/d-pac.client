'use strict';
const {Collection} = require( 'backbone' );
const debug = require( 'debug' )( 'dpac:common.collections', '[UsersCollection]' );
const teardown = require( '../../common/mixins/teardown' );
const ModelClass = require( '../models/UserProxy' );

module.exports = Collection.extend( {
    model: ModelClass,

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( raw ){
        return raw.data;
    },

    fetchAssessors: function( assessment, opts ){
        this.url = '/assessments/'+ assessment.id + '/assessor';
        this.fetch(opts);
    }
} );
teardown.collection.mixin( module.exports );
