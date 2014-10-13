'use strict';

var debug = require( 'debug' )( 'dpac:assess', '[TimelogsCollection]' );

var ModelClass = require('../models/TimelogProxy');

module.exports = Backbone.Collection.extend({

    model : ModelClass,

    initialize : function(){
        debug('#initialize');
    }
});
