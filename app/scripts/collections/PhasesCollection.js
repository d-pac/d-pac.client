'use strict';

var debug = require( 'debug' )( 'dpac:collections', '[PhasesCollection]' );

var ModelClass = require('../models/PhaseModel');

module.exports = Backbone.Collection.extend({

    model : ModelClass,

    initialize : function(){
        debug('#initialize');
    }
});
