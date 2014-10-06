'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[WizardView]' );
var tpl = require( './templates/WizardView.hbs' );

var viewTypeMap = {
    "select"      : "selectionFactory",
    "seq"         : "seqFactory",
    "passfail"    : "passfailFactory",
    "comparative" : "comparativeFactory"
};

module.exports = Marionette.LayoutView.extend( {
    template    : tpl,
    regions     : {
        content : "#assessment-wizard-content"
    },
    modelEvents : {
        "select:one" : "render"
    },

    initialize : function(){
        debug( "#initialize" );
    },
    onRender   : function(){
        var phase = this.model.getCurrentPhase();
        var factory = this[viewTypeMap[phase]];

        if( !factory ){
            debug.error( 'view factory not found for phase "' + phase + "' mapped to '" + viewTypeMap[phase] + "'" );
            this.content.empty()
        }else{
            this.content.show( factory() );
        }
    }
} );
