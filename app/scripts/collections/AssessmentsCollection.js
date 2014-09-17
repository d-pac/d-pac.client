'use strict';

var debug = require( 'debug' )( 'dpac:collections', '[AssessmentsCollection]' );

var AssessmentModel = require('../models/AssessmentModel');

module.exports = Backbone.Collection.extend({
    model : AssessmentModel,

    initialize : function(){
        debug('#initialize');
    }
});
