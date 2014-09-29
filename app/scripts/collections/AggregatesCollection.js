'use strict';

var debug = require( 'debug' )( 'dpac:collections', '[AggregatesCollection]' );

var AggregateModel = require('../models/AggregateModel');

module.exports = Backbone.Collection.extend({

    model : AggregateModel,

    initialize : function(){
        debug('#initialize');
    },

    hasActive: function (){
        return this.length <= 0
    },

    getActive : function(){
        return this.at(0);
    }
});
