'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[JudgementsCollection]' );

var ModelClass = require('../models/JudgementProxy');

module.exports = Backbone.Collection.extend({

    model : ModelClass,

    initialize : function(){
        debug('#initialize');
    }
});
