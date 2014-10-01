'use strict';

var debug = require( 'debug' )( 'dpac:assess.collections', '[AssessmentsCollection]' );

var AssessmentModel = require( '../models/AssessmentProxy' );

module.exports = Backbone.Collection.extend( {
    model : AssessmentModel,

    initialize : function(models){
        debug( '#initialize' );
        Backbone.Select.One.applyTo( this, models );
    },

    selectByID : function(id){
        var model = this.get(id);
        this.select(model);
    }
} );
