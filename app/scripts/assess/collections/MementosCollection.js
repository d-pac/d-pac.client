'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[MementosCollection]' );

module.exports = Backbone.Collection.extend( {

    url : '/me/mementos',

    initialize : function( models ){
        debug( '#initialize' );
        Backbone.Select.One.applyTo( this, models );
        this.on('deselect:one', this.teardownModel, this);
    },

    hasActive : function(){
        var found = this.findWhere( {
            completed : false
        } );
        return !!found;
    },

    getActive : function(){
        return this.findWhere( {
            completed : false
        } );
    },

    teardownModel : function(model){
        this.remove(model);
        model.teardown();
    }
} );
