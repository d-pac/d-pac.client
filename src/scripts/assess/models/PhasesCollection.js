'use strict';

const {Collection} = require( 'backbone' );

const debug = require( 'debug' )( 'dpac:assess.collections', '[PhasesCollection]' );
const teardown = require( '../../common/mixins/teardown' );
const propagateEvents = require('../../common/mixins/propagateEvents');
const ModelClass = require( '../models/PhaseProxy' );

module.exports = Collection.extend( {
    url: '/phases',
    model: ModelClass,

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( response ){
        return response.data;
    }
} );
teardown.collection.mixin( module.exports );
propagateEvents.mixin( module.exports ).propagate( {
    "sync": "phases:collection:sync"
} );
