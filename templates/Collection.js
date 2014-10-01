'use strict';

var debug = require( 'debug' )( 'dpac:<%= meta.package %>', '[<%= file.name %>]' );

var ModelClass = require('../models/');

module.exports = Backbone.Collection.extend({

    model : ModelClass,

    initialize : function(){
        debug('#initialize');
    }
});
