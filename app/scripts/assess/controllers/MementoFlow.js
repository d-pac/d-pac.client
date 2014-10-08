'use strict';

var debug = require( 'debug' )( 'dpac:assess.controllers', '[MementoFlow]' );
module.exports = Marionette.Controller.extend( {
    wiring  : {
        parser : 'mementoParser'
    },

    execute : function(){
        debug( '#execute' );

        _.extend( this, this.parser.parse( this.eventData.memento.toJSON() ) );

        this.context.wireValue( 'currentAssessment', this.assessment );
        this.context.wireValue( 'currentComparison', this.comparison );
        this.context.wireValue( 'currentPhases', this.phases );
        this.context.wireValue( 'currentRepresentations', this.representations );
        this.context.wireValue( 'currentJudgements', this.judgements );
        this.context.wireValue( 'currentSeqs', this.seqs );

        this.representations.on('select:one', this.representationSelected, this);

        this.phases.on('select:phase:select', this.setupSelectionPhase, this);
        this.phases.on('deselect:phase:select', this.teardownSelectionPhase, this);
        this.phases.on('select:phase:seq', this.setupSeqPhase, this);
        this.phases.on('deselect:phase:seq', this.teardownSeqPhase, this);

        this.phases.selectByID( this.comparison.get( 'phase' ) );
        this.phases.on('select:one', this.phaseSelected, this);

    },

    phaseSelected : function(phase){
        debug.debug('phaseSelected');
        this.comparison.save({
            phase : phase.id
        });
    },

    setupSelectionPhase : function(phase){
        debug.debug('setupSelectionPhase');
        this.representations.selectByID( this.comparison.get( 'selected' ) );
    },

    teardownSelectionPhase : function(phase){
        debug.debug('teardownSelectionPhase');
        this.comparison.save();
    },

    setupSeqPhase : function(phase){
        debug.debug('handleSeqPhase');
        this.seqs.selectByFind({
            comparison : this.comparison.id,
            phase : phase.id
        });
    },
    teardownSeqPhase : function(phase){
        debug.debug('teardownSeqPhase');
        this.seqs.selected.save();
    },

    representationSelected : function(representation){
        debug.debug('representationSelected');
        this.comparison.set('selected', representation.id);
    }
} );
