'use strict';

var debug = require( 'debug' )( 'dpac:views', '[ComparisonView]' );
var tpl = require( './templates/ComparisonView.hbs' );

module.exports = Marionette.LayoutView.extend( {

    template : tpl,

    regions : {
        wizard : "#comparison-wizard"
    },

    initialize : function(){
        debug( "#initialize" );
    },

    onRender : function(){
        var phase = this.model.getCurrentPhase();
        var factory = this[phase + 'Factory'];
        if( !factory ){
            debug.error( 'view factory not found for phase "' + phase + "'" );
            phase = this.model.getDefaultPhase();
            factory = this[phase + 'Factory'];
        }
        this.wizard.show( factory() );
        this.next();
    },

    next : function(){
        this.model.gotoNextPhase();
        //this.render();
    },
    previous : function(){
        this.model.gotoPreviousPhase();
        this.render();
    }

} );
