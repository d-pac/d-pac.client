'use strict';
var Backbone = require('backbone');
var Select = require('backbone.select');
var debug = require( 'debug' )( 'dpac:assess.collections', '[RepresentationsCollection]' );
var teardown = require('../mixins/teardown');
var ModelClass = require('../models/RepresentationProxy');

module.exports = Backbone.Collection.extend({

    model : ModelClass,

    initialize : function(models){
        debug('#initialize');
        Select.One.applyTo(this, models);
    },

    selectByID : function(id){
        //debug.debug('selectByID', id);
        var model = this.get(id);
        if(model){
            this.select(model);
        }
        return model;
    },

    getSelectedID: function(){
        if(this.selected){
            return this.selected.id;
        }
        return undefined;
    },

    onTeardown : function(){
        debug("#teardown");
        this.deselect( this.selected, { silent : true } );
    }
});
teardown.collection.mixin( module.exports );
