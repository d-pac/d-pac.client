'use strict';

var debug = require( 'debug' )( 'dpac:assess.controllers', '[MementoFlow]' );
module.exports = Marionette.Controller.extend( {
    wiring  : {
        parser : 'mementoParser'
    },
    execute : function(){
        debug( '#execute' );

        var aggregate = this.parser.parse( this.eventData.memento.toJSON() );
        this.context.wireValue( 'currentAssessment', aggregate.assessment );
        this.context.wireValue( 'currentComparison', aggregate.comparison );
        this.context.wireValue( 'currentPhases', aggregate.phases );
        this.context.wireValue( 'currentRepresentations', aggregate.representations );
        this.context.wireValue( 'currentJudgements', aggregate.judgements );
        this.context.wireValue( 'currentSeqs', aggregate.seqs );

        aggregate.representations.on( 'select:one', this.representationSelected, this );
    },

    representationSelected : function( representation ){
        debug.debug( '#representationSelected', representation.id );
        this.phases.selectNext();
        this.comparison.update( {
            selected : representation.id,
            phase    : this.phases.selected.id
        } );
    }

} );
