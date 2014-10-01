'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[PhasesCollection]' );

var ModelClass = require( '../models/PhaseProxy' );

module.exports = Backbone.Collection.extend( {

    model : ModelClass,

    initialize : function( models ){
        debug( '#initialize' );
        Backbone.Select.One.applyTo( this, models );
    },

    selectByID : function(id){
        console.log('selectByID', id);
        var model = this.get(id);
        this.select(model);
    },
    selectNext     : function(){
        var index = this.models.indexOf( this.selected );
        var model = this.at( index + 1 );
        this.select( model );
        return model;
    },
    selectPrevious : function(){
        var index = this.models.indexOf( this.selected );
        var model = this.at( index - 1 );
        this.select( model );
        return model;
    },
    getCurrentPhase : function(){
        return this.selected.get('type');
    }
} );
