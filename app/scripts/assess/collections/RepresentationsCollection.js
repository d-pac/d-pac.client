'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[RepresentationsCollection]' );

var ModelClass = require('../models/RepresentationProxy');

module.exports = Backbone.Collection.extend({

    model : ModelClass,

    initialize : function(models){
        debug('#initialize');
        Backbone.Select.One.applyTo(this, models);
    },

    selectByID : function(id){
        debug.debug('#selectByID', id);
        var model = this.get(id);
        this.select(model);
    }
});
