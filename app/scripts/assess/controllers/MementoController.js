'use strict';

var debug = require( 'debug' )( 'dpac:assess.controllers', '[MementoFlow]' );
module.exports = Marionette.Controller.extend( {
    execute : function(){
        debug( '#execute' );

        var memento = this.eventData.memento;
        var representations = memento.get('representations');
        var phases = memento.get('phases');
        this.comparison = memento.get('comparison');

        this.context.wireValue( 'currentAssessment', memento.get('assessment') );
        this.context.wireValue( 'currentComparison', this.comparison );
        this.context.wireValue( 'currentPhases', phases );
        this.context.wireValue( 'currentRepresentations', representations );
        this.context.wireValue( 'currentJudgements', memento.get('judgements') );
        this.context.wireValue( 'currentSeqs', memento.get('seqs') );

        representations.selectByID(this.comparison.get('selected'));
        phases.selectByID( this.comparison.get( 'phase' ) );

        representations.on('select:one', this.representationSelected, this);
        phases.on('select:one', this.phaseSelected, this);
        phases.on('completed', this.completed, this);

    },

    phaseSelected : function(phase){
        debug.debug('phaseSelected');
        this.comparison.set({
            phase : phase.id
        });
    },

    representationSelected : function(representation){
        debug.debug('representationSelected');
        this.comparison.set('selected', representation.id);
    },

    completed : function(){
        this.comparison.set('completed', true);
    }
} );
