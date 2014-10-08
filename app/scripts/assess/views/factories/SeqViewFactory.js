'use strict';

module.exports = Marionette.ItemView.extend( {
    wiring      : ['currentComparison', 'currentPhases', 'currentSeqs', 'SeqView'],
    constructor : function(){
        var phase = this.currentPhases.selected;
        var seq = this.currentSeqs.selectByFind( {
            comparison : this.currentComparison.id,
            phase      : phase.id
        } );

        return new this.SeqView( {
            model : seq
        } );
    }
} );

