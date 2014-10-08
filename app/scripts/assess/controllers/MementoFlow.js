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

        this.representations.selectByID(this.comparison.get('selected'));
        this.representations.on('select:one', this.representationSelected, this);
        this.phases.selectByID( this.comparison.get( 'phase' ) );
        this.phases.on('select:one', this.phaseSelected, this);

    },

    phaseSelected : function(phase){
        debug.debug('phaseSelected');
        this.comparison.set({
            phase : phase.id
        });
    },

    comparisonChanged : function(){
        debug.debug('comparisonChanged');
        this.comparison.save();
    },

    representationSelected : function(representation){
        debug.debug('representationSelected');
        this.comparison.set('selected', representation.id);
    }
} );
