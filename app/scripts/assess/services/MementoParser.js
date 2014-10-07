'use strict';
var debug = require( 'debug' )( 'dpac:assess', '[MementoParser]' );
var Comparison = require( '../models/ComparisonProxy' );
var Phases = require( '../collections/PhasesCollection' );
var Representations = require( '../collections/RepresentationsCollection' );
var Judgements = require( '../collections/JudgementsCollection' );
var Seqs = require('../collections/SeqsCollection');

var MementoParser = module.exports = function MementoParser(){
    debug('#constructor');
};
_.extend( MementoParser.prototype, {
    wiring : {
        'assessments' : 'assessmentsCollection'
    },

    parse : function(memento){
        debug.log( '#parse' );

        var result = {};
        result.assessments = this.assessments;
        result.assessments.merge(memento.assessment); // add to -or- update in collection
        result.assessment = result.assessments.get( memento.assessment._id );

        result.comparison = new Comparison(memento.comparison);

        result.phases = new Phases();
        result.phases.add(memento.phases);
        result.phases.selectByID( result.comparison.get( 'phase' ) );

        result.representations = new Representations();
        result.representations.add( memento.representations );

        result.judgements = new Judgements();
        _.each( memento.judgements, function( judgement ){
            judgement.representation = result.representations.get( judgement.representation ).toJSON();
        } );
        result.judgements.add( memento.judgements );

        result.seqs = new Seqs();
        if(memento.seqs){
            result.seqs.add(memento.seqs);
        }
        return result;
    }
} );
