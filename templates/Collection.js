'use strict';

var debug = require( 'debug' )( 'dpac:collections', '[<%= file.name %>]' );

var ModelClass = require('../models/');

module.exports = Backbone.Collection.extend({

    model : ModelClass,

    initialize : function(){
        debug('#initialize');
    }
});
