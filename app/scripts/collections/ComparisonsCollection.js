'use strict';

'use strict';

var debug = require( 'bows' )( 'dpac:collections' );

var ComparisonModel = require('../models/ComparisonModel');

module.exports = Backbone.Collection.extend({
    model : ComparisonModel,

    initialize : function(models){
        debug('ComparisonCollection#initialize');
        Backbone.Select.One.applyTo( this, models );
    }
});
