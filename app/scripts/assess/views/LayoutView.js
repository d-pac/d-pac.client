'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[LayoutView]' );
var tpl = require( './templates/LayoutView.hbs' );

module.exports = Marionette.LayoutView.extend( {
    wizardFactory : undefined,
    detailFactory : undefined,

    template : tpl,

    regions : {
        wizard : "#assessment-wizard",
        detail : "#assessment-detail"
    },

    initialize : function(){
        debug( "#initialize" );
    },

    onRender : function(){
        this.detail.show( this.detailFactory() );
        this.wizard.show( this.wizardFactory() );
        //var phase = this.model.getCurrentPhase();
        //var factory = this[phase + 'Factory'];
        //if( !factory ){
        //    debug.error( 'view factory not found for phase "' + phase + "'" );
        //    phase = this.model.getDefaultPhase();
        //    factory = this[phase + 'Factory'];
        //}
        //this.wizard.show( factory() );
    }

} );
