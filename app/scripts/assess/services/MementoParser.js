'use strict';
var debug = require( 'debug' )( 'dpac:assess', '[MementoParser]' );
var Comparison = require( '../models/ComparisonProxy' );
var Phases = require( '../collections/PhasesCollection' );
var Representations = require( '../collections/RepresentationsCollection' );
var Progress = require('../models/ProgressModel');

var MementoParser = module.exports = function MementoParser(){
    debug( '#constructor' );
};
_.extend( MementoParser.prototype, Backbone.Events, {
    wiring        : {
        'assessments' : 'assessmentsCollection'
    },
    contextEvents : {
        'assessment:teardown:requested' : "teardown"
    },

    parse : function( memento ){
        debug.log( '#parse' );

        var result = {};

        //assessments
        var assessments = this.assessments;
        assessments.updateAndSelect( memento.assessment ); // add to -or- update in collection
        result.assessment = assessments.get( memento.assessment._id );

        //comparison
        result.comparison = new Comparison( memento.comparison );

        //phases
        result.phases = new Phases();
        result.phases.add( memento.phases );

        //representations
        result.representations = new Representations();

        //progress
        result.progress = new Progress( memento.progress );

        debug.debug( result );
        return result;
    },

    teardown : function(){
        debug( "#teardown" );
        this.stopListening();

        this.assessments = undefined;
    }
} );
