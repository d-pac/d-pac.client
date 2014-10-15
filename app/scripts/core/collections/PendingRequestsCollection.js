'use strict';

var debug = require( 'debug' )( 'dpac:core', '[PendingRequestsCollection]' );

var ModelClass = require('../models/PendingRequestModel');

module.exports = Backbone.Collection.extend({

    model : ModelClass,

    initialize : function(){
        debug('#initialize');
        var self = this;
        this.on("remove", function(){
            if(self.isEmpty() ){
                self.trigger("requests:pending:empty");
            }
        })
    },

    removeByUUID : function(uuid){
        var model = this.findWhere({
            uuid:uuid
        });
        return this.remove(model);
    },

    isEmpty : function(){
        return this.length <= 0;
    }

});
