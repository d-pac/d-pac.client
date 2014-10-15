'use strict';

var debug = require( 'debug' )( 'dpac:core', '[ErrorsCollection]' );

var ModelClass = require( '../models/ErrorModel' );

module.exports = Backbone.Collection.extend( {

    url : "",
    model : ModelClass,

    initialize : function( models,
                           opts ){
        debug( '#initialize' );

        opts = _.defaults( {}, opts, {
            shortcut : 'ctrl+alt+d'
        } );
        var collection = this;

        Mousetrap.bind( opts.shortcut, function(){
            collection.dump();
        } );
    },

    dump : function(){
        debug("#dump");
        this.each( function( model ){
            if( !model.get('dumped')){
                model.set( 'dumped', true );
                console.log( model.toJSON() );
            }
        } );
    }
} );
