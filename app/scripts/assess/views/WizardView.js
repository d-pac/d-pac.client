'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[WizardView]' );
var tpl = require( './templates/WizardView.hbs' );

module.exports = Marionette.LayoutView.extend( {
    template         : tpl,
    regions          : {
        content : "#assessment-wizard-content"
    },
    collectionEvents : {
        "select:one" : "render",
        "completed" : "showProcessing"
    },
    className: "col-md-12 column",

    initialize : function(){
        debug( "#initialize" );
    },
    onRender   : function(){
        var type = this.collection.getCurrentType();
        var factory = this[type + "Factory"];

        if( !factory ){
            debug.error( 'view factory not found for type "' + type + "'" );
            this.content.empty()
        }else{
            var view = factory();
            this.content.show( view );
            this.listenTo( view, 'representation:selected', this.gotoNext );
            this.listenTo( view, 'seq:edited', this.gotoNext );
            this.listenTo( view, 'comparativeFeedback:edited', this.gotoNext );
            this.listenTo( view, 'passfail:edited', this.gotoNext );
        }
    },

    gotoNext : function(){
        debug.debug( 'gotoNext' );
        this.stopListening( this.content.currentView );
        this.collection.selectNext();
    },

    showProcessing : function(){
        debug.debug("#showProcessing");
    }
} );
