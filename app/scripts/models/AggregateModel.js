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

    toJSON : function(){
        //Holy crap, do we really need to do this?
        var attr = Backbone.Model.prototype.toJSON.call( this );
        attr.title = this.get( 'assessment.title' );
        attr.description = this.get( 'assessment.description' );
        return attr;
    },

    isActive : function(){
        return this.get( 'comparison.active' );
    },

    getCurrentPhase : function(){
        return this.get( 'comparison.phase' );
    },

    getDefaultPhase : function(){
        return phasesList[0];
    },

    gotoNextPhase : function(){
        var currentPhase = this.getCurrentPhase();
        var index = phasesList.indexOf(currentPhase);
        if(++index >= phasesList.length){
            index=phasesList.length-1;
        }
        this.set( 'comparison.phase', phasesList[index] );
        this.save();
    },

    gotoPreviousPhase : function(){
        var currentPhase = this.getCurrentPhase();
        var index = phasesList.indexOf(currentPhase);
        if(--index < 0){
            index = 0;
        }
        this.set( 'comparison.phase', phasesList[index] );
        this.save();
    }

} );
