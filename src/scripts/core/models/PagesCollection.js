'use strict';
const {Collection} = require('backbone');

const debug = require( 'debug' )( 'dpac:core', '[PagesCollection]' );

const ModelClass = require( '../models/PageProxy' );

module.exports = Collection.extend( {

    url: '/pages',
    model: ModelClass,

    initialize: function( models,
                          opts ){
        debug( '#initialize' );
    },

    parse: function( raw ){
        return raw.data;
    }
} );
