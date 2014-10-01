'use strict';

var debug = require( 'debug' )( 'dpac:<%= meta.package %>', '[<%= file.name %>]' );
module.exports = Backbone.Model.extend({
    initialize : function(){
        debug('#initialize');
    }
});
