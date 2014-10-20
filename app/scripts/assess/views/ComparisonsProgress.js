'use strict';

var debug = require( 'debug' )( 'dpac:assess.views', '[ComparisonsProgress]' );
var tpl = require('./templates/ComparisonsProgress.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,
    initialize : function(){
        debug("#initialize");
        console.log(this.model);
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
