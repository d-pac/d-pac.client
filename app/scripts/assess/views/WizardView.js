'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[WizardView]' );
var tpl = require('./templates/WizardView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(){
        debug("#initialize");
    },
    onRender : function(){
        var phase = this.model.getCurrentPhase();
        console.log(phase);
        //var factory = this[phase + 'Factory'];
        //if( !factory ){
        //    debug.error( 'view factory not found for phase "' + phase + "'" );
        //    phase = this.model.getDefaultPhase();
        //    factory = this[phase + 'Factory'];
        //}
        //this.wizard.show( factory() );
    }
});
