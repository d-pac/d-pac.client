'use strict';
var debug = require( 'debug' )( 'dpac:assess.models', '[AggregateModel]' );

var phasesMap = {
    JUDGEMENT       : 'judgement',
    JUDGEMENT_SEQ   : 'judgementSEQ',
    COMPARATIVE     : 'comparative',
    COMPARATIVE_SEQ : 'comparativeSEQ',
    PASS_FAIL       : 'passfail',
    PASS_FAIL_SEQ   : 'passfailSEQ'
};

var phasesList = [
    phasesMap.JUDGEMENT,
    phasesMap.JUDGEMENT_SEQ,
    phasesMap.COMPARATIVE,
    phasesMap.COMPARATIVE_SEQ,
    phasesMap.PASS_FAIL,
    phasesMap.PASS_FAIL_SEQ
];

module.exports = Backbone.NestedModel.extend( {
    phases           : undefined,
    assessments      : undefined,
    representations  : undefined,
    judgements       : undefined,
    comparison       : undefined,
    createComparison : undefined,

    initialize : function( attrs ){
        debug( '#initialize' );
        Backbone.Select.Me.applyTo( this );
    },

    parse : function( response,
                      options ){
        console.log( response );
        this.assessments.add( response.assessment );
        this.phases.add( response.phases );
        this.representations.add( response.representations );
        this.judgements.add( response.judgements );
        this.comparison = this.createComparison(response.comparison);
    }
} );
