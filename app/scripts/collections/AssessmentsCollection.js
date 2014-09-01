'use strict';

var debug = require( 'bows' )( 'dpac:collections' );

var AssessmentModel = require('../models/AssessmentModel');

module.exports = Backbone.Collection.extend({
    model : AssessmentModel,

    initialize : function(){
        debug('AssessmentsCollection#initialize');
    }
});
