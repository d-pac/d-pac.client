'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[PassFailView]' );
var tpl = require( './templates/PassFailView.hbs' );

module.exports = Marionette.ItemView.extend( {
    template  : tpl,
    ui        : {
        saveButton : ".save-button"
    },
    events    : {
        "click @ui.saveButton" : "save"
    },
    className : "col-md-12 column",

    initialize : function(){
        debug( "#initialize" );

        this.leftModel = this.collection.at( 0 );
        this.rightModel = this.collection.at( 1 );
    },

    serializeData : function(){
        var data = $.t( "assessment:comparisons.passfail.options", { returnObjectTrees : true } );
        data[this.leftModel.get( 'passed' )].left = true;
        data[this.rightModel.get( 'passed' )].right = true;
        return {
            options : data
        };
    },

    save : _.debounce( function(){
        debug.debug( '#save' );
        this.leftModel.set( 'passed', this.$( "input:radio[name ='leftPassFail']:checked" ).val() );
        this.rightModel.set( 'passed', this.$( "input:radio[name ='rightPassFail']:checked" ).val() );

        this.trigger( 'passfail:edited' );
    }, 1000, true )
} )
;
