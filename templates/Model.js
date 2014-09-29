'use strict';

var debug = require( 'debug' )( 'dpac:models', '[<%= file.name %>]' );
module.exports = Backbone.Model.extend({
    initialize : function(){
        debug('#initialize');
    }
});
