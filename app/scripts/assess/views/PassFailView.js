'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[PassFailView]' );
var tpl = require( './templates/PassFailView.hbs' );

module.exports = Marionette.ItemView.extend( {
    template  : tpl,
    ui        : {
        saveButton : ".save-button",
        leftButtons : "input:radio[name ='leftPassFail']",
        rightButtons : "input:radio[name ='rightPassFail']"
    },
    events    : {
        "click @ui.saveButton" : "save",
        "click @ui.leftButtons" : "valueClicked",
        "click @ui.rightButtons" : "valueClicked"
    },
    className : "col-md-8 col-md-offset-2 column",

    initialize : function(){
        debug( "#initialize" );

        this.leftModel = this.collection.at( 0 );
        this.rightModel = this.collection.at( 1 );
    },

    serializeData : function(){
        var data = $.t( "assessment:comparisons.passfail.options", { returnObjectTrees : true } );
        var left = this.leftModel.get( 'passed' );
        var right = this.rightModel.get( 'passed' );
        if( left ){
            data[left].left = true;
        }
        if( right ){
            data[right].right = true;
        }
        return {
            options : data
        };
    },

    onRender : function(){
        var left = this.$( "input:radio[name ='leftPassFail']:checked" ).val();
        var right= this.$( "input:radio[name ='rightPassFail']:checked" ).val();
        this.setButtonState(left, right);
    },

    valueClicked : function(){
        var left = this.$( "input:radio[name ='leftPassFail']:checked" ).val();
        var right= this.$( "input:radio[name ='rightPassFail']:checked" ).val();
        this.setButtonState(left, right);
    },

    setButtonState : function(left, right){
        this.$(this.ui.saveButton ).prop('disabled', !left || !right);
    },

    save : _.debounce( function(){
        debug.debug( '#save' );
        this.leftModel.set( 'passed', this.$( "input:radio[name ='leftPassFail']:checked" ).val() );
        this.rightModel.set( 'passed', this.$( "input:radio[name ='rightPassFail']:checked" ).val() );

        this.trigger( 'passfail:edited' );
    }, 1000, true )
} )
;
