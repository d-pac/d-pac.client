'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[PhasesCollection]' );
var teardown = require('../mixins/teardown');
var ModelClass = require( '../models/PhaseProxy' );

module.exports = Backbone.Collection.extend( {

    model : ModelClass,

    initialize : function( models ){
        debug( '#initialize' );
        Backbone.Select.One.applyTo( this, models );

        this.listenTo(this, 'select:one', function(phase){
            this.trigger('select:phase:'+phase.get('type'), phase);
        }, this);
        this.listenTo(this, 'deselect:one', function(phase){
            this.trigger('deselect:phase:'+phase.get('type'), phase);
        });
    },

    _swapAsync : function(model){
        if(this.selected){
            this.deselect();
        }
        if(model){
            setTimeout(function(){
                this.select(model);
            }.bind(this), 0);
        }
    },

    selectByID : function(id){
        //debug.debug('selectByID', id);
        var model = this.get(id);
        this.select(model);
        return model;
    },

    selectNext : function(){
        var index = this.models.indexOf( this.selected );
        var model = this.at( index + 1 );
        if(! model){
            this.deselect();
            return this.completed();
        }
        this._swapAsync(model);
        return model;
    },
    getCurrentType : function(){
        return this.selected.get('type');
    },

    completed : function(){
        this.trigger('completed');
    },

    onTeardown : function(){
        debug("#teardown");
        this.deselect( this.selected, { silent : true } );
    }

} );
teardown.collection.mixin( module.exports );
