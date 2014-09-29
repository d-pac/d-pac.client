'use strict';

var debug = require( 'debug' )( 'dpac:collections', '[RepresentationsCollection]' );

var ModelClass = require('../models/RepresentationModel');

module.exports = Backbone.Collection.extend({

    model : ModelClass,

    initialize : function(){
        debug('#initialize');
    }
});
