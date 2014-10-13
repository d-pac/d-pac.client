'use strict';

var debug = require( 'debug' )( 'dpac:<%= meta.package %>', '[<%= file.name %>]' );
module.exports = Backbone.Model.extend({
    idAttribute : "_id",
    url : "",

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
    }
});
