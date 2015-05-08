'use strict';
var Backbone = require('backbone');

var debug = require( 'debug' )( 'dpac:core', '[PagesCollection]' );

var ModelClass = require( '../models/PageProxy' );

module.exports = Backbone.Collection.extend( {

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
