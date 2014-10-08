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
    collectionEvents : {
        "select:one" : "render"
    },

    initialize : function(){
        debug( "#initialize" );
    },
    onRender   : function(){
        var type = this.collection.getCurrentType();
        var factory = this[viewTypeMap[type]];

        if( !factory ){
            debug.error( 'view factory not found for type "' + type + "' mapped to '" + viewTypeMap[type] + "'" );
            this.content.empty()
        }else{
            var view = factory();
            this.content.show( view );
            this.listenTo( view, 'representation:selected', this.gotoNext );
            this.listenTo( view, 'seq:edited', this.gotoNext );
        }
    },

    gotoNext : function(){
        debug.debug('gotoNext');
        this.stopListening(this.content.currentView);
        this.collection.selectNext();
    }
} );
