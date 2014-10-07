'use strict';

var debug = require( 'debug' )( 'dpac:assess.controllers', '[MementoFlow]' );

module.exports = Marionette.Controller.extend( {
    constructor : function(context, eventName, eventData){
        debug( '#constructor' );
        this.context = context;
        this.setupMementoWirings(eventData.memento);
    },
    setupMementoWirings : function( memento ){
        debug( '#setupMementoWirings' );
        this.context.wireValue( 'currentComparison', memento.comparison );
        this.context.wireValue( 'currentAssessment', memento.assessment );
        this.context.wireValue( 'currentJudgements', memento.judgements );
        this.context.wireValue( 'currentPhases', memento.phases );
        this.context.wireValue( 'currentRepresentations', memento.representations );
    }
});
