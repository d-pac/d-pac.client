'use strict';
var _ = require( 'underscore' );
var Backbone = require('backbone');

var debug = require( 'debug' )( 'dpac:assess', '[MementoParser]' );
var Comparison = require( '../models/ComparisonProxy' );
var Phases = require( '../collections/PhasesCollection' );
var Representations = require( '../collections/RepresentationsCollection' );
var Progress = require('../models/ProgressModel');

var MementoParser = module.exports = function MementoParser(){
    debug( '#constructor' );
};
_.extend( MementoParser.prototype, Backbone.Events, {
    assessments: undefined,

    contextEvents : {
        'assessment:teardown:requested' : "teardown"
    },

    parse : function( memento ){
        debug.log( '#parse' );

        var attrs = {};

        //assessments
        var assessments = this.assessments;
        assessments.updateAndSelect( memento.assessment ); // add to -or- update in collection
        attrs.assessment = assessments.get( memento.assessment );

        //comparison
        attrs.comparison = new Comparison( memento.comparison );

        //phases
        attrs.phases = new Phases();
        attrs.phases.add( memento.phases );

        //representations
        attrs.representations = new Representations();

        //progress
        attrs.progress = new Progress( memento.progress );

        debug.debug( attrs );
        return attrs;
    },

    teardown : function(){
        debug( "#teardown" );
        this.stopListening();

        this.assessments = undefined;
    }
} );
