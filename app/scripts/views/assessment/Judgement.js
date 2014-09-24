'use strict';

var debug = require( 'debug' )( 'dpac:views', '[ComparisonWizard]' );
var tpl = require('./templates/ComparisonWizard.hbs');

module.exports = Marionette.ItemView.extend({
    template : tpl,

    initialize : function(){
        debug("#initialize");
    }
});
