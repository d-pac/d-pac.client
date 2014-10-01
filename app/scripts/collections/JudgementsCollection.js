'use strict';

var debug = require( 'debug' )( 'dpac:collections', '[JudgementsCollection]' );

var ModelClass = require('../models/JudgementModel');

module.exports = Backbone.Collection.extend({

    model : ModelClass,

    initialize : function(){
        debug('#initialize');
    }
});
