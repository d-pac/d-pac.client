'use strict';
const {reduce} = require( 'lodash' );
const NestedModel = require( 'backbone-nested-model' );
const debug = require( 'debug' )( 'dpac:core.models', '[UserProxy]' );
module.exports = NestedModel.extend( {
    idAttribute: "_id",
    url: '/user',
    defaults: {
        name: {
            first: undefined,
            last: undefined
        },
        email: undefined,
        anonymized: undefined,
        completedComparisons: 0,
        infit: NaN
    },

    initialize: function(){
        debug( '#initialize', this.id );
    },
} );
