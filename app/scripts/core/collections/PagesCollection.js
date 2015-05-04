'use strict';

var debug = require( 'debug' )( 'dpac:core', '[PagesCollection]' );

var ModelClass = require( '../models/PageProxy' );

module.exports = Backbone.Collection.extend( {

    url: '/pages',
    model: ModelClass,

    contextEvents: {
        "pages:collection:requested": "fetch"
    },

    initialize: function( models,
                          opts ){
        debug( '#initialize' );
        this.on("sync", function(){
            this.dispatch("pages:collection:sync" );
        }.bind(this));
    },

    parse: function( raw ){
        return raw.data;
    }
} );
