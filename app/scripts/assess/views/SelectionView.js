'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[SelectionView]' );
var tpl = require('./templates/SelectionView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,

    initialize : function(){
        debug("#initialize");
    },
    ui : {
        leftBtn : "#select-left",
        rightBtn : "#select-right"
    },
    events           : {
        'click @ui.leftBtn' : "representationSelected",
        'click @ui.rightBtn' : "representationSelected"
    },

    serializeData : function(){
        return {
            leftId : this.collection.at(0).id,
            rightId : this.collection.at(1).id
        }
    },

    representationSelected : function( event ){
        this.collection.selectByID( this.$( event.target ).attr( 'data-model-id' ) );
    }

});
