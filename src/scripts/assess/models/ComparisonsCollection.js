'use strict';

const {Collection} = require( 'backbone' );
const {assign} = require('lodash');

const debug = require( 'debug' )( 'dpac:assess.collections', '[ComparisonsCollection]' );
const ModelClass = require( '../models/ComparisonProxy' );
const teardown = require( '../../common/mixins/teardown' );
const selectable = require( '../../common/mixins/selectable' );
const propagateEvents = require('../../common/mixins/propagateEvents');

module.exports = Collection.extend( {

    parser: undefined,

    url: '/user/comparisons',
    model: ModelClass,
    contextEvents: {
        'assess:ui:destroyed': function(){
            this.reset();
        },
        'assess:teardown:requested': "teardown",
        'authentication:signout:completed': function(){
            this.reset();
        }
    },

    initialize: function( models ){
        debug( '#initialize' );
    },

    parse: function( response ){
        debug( '#parse' );
        return this.parser.parseCollection( response );
    },

    hasActives: function(){
        return this.findWhere( { completed: false } );
    },

    getActivesFor: function(filter){
        return this.where(assign({ completed: false },filter));
    },

    getActives: function(){
        const actives = this.filter( function( item ){
            return !item.get( 'completed' );
        } );
        return actives || [];
    },

    teardownModel: function( model ){
        debug.debug( '#teardownModel' );
        if( model ){
            this.remove( model );
            model.teardown();
        }
    }

} );
selectable.mixin( module.exports );
teardown.collection.mixin( module.exports );
propagateEvents.mixin( module.exports ).propagate( {
    "sync": "comparisons:collection:sync"
} );
