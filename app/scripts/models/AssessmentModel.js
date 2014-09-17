'use strict';

var debug = require( 'debug' )( 'dpac:models', '[AssessmentModel]' );
module.exports = Backbone.Model.extend({
    initialize : function(){
        debug('#initialize');
    }
});
