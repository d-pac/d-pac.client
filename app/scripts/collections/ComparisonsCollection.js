'use strict';

'use strict';

var debug = require( 'debug' )( 'dpac:collections', '[ComparisonCollection]' );

var ComparisonModel = require('../models/ComparisonModel');

module.exports = Backbone.Collection.extend({
    model : ComparisonModel,

    initialize : function(){
        debug('#initialize');
    }
});
