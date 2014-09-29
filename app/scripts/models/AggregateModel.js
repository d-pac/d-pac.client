'use strict';
var debug = require( 'debug' )( 'dpac:models', '[AggregateModel]' );

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

    initialize : function(attrs){
        debug( '#initialize' );
    },

    parse : function(response, options){
        console.log(response);
    }
} );
