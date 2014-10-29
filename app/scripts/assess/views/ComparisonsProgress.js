'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[ComparisonsProgress]' );
var tpl = require('./templates/ComparisonsProgress.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    className : "col-md-8 col-md-offset-2 column",

    initialize : function(){
        debug("#initialize");
    },

    serializeData : function(){
        var output = this.model.toJSON();
        if(output.percentage>=50){
            output.labelLeft = true;
        }else{
            output.labelRight = true;
        }
        return output;
    }
});
