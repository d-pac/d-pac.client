'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[JudgementsCollection]' );
var teardown = require('../mixins/teardown');
var ModelClass = require('../models/JudgementProxy');

module.exports = Backbone.Collection.extend({

    url : '/judgements',
    model : ModelClass,

    initialize : function(){
        debug('#initialize');
        teardown.collection.mixin(this);
    }
});
