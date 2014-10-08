'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[SelectionView]' );
var tpl = require('./templates/SelectionView.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    ui : {
        leftBtn : "#select-left",
        rightBtn : "#select-right"
    },
    events           : {
        'click @ui.leftBtn' : "representationSelected",
        'click @ui.rightBtn' : "representationSelected"
    },

    initialize : function(){
        debug("#initialize");
        debug.debug(this.collection.selected);
    },

    serializeData : function(){
        var leftId = this.collection.at(0).id;
        var rightId = this.collection.at(1).id;
        var selectedID = this.collection.getSelectedID();
        return {
            leftId : leftId,
            rightId : rightId,
            leftSelected :  selectedID=== leftId,
            rightSelected : selectedID=== rightId
        }
    },

    representationSelected : function( event ){
        var representation = this.$( event.target ).attr( 'data-model-id' );
        this.collection.selectByID( representation );
        this.trigger("representation:selected", representation);
    }

});
