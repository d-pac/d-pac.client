'use strict';
var Backbone = require('backbone');

var debug = require( 'debug' )( 'dpac:core', '[PendingRequestsCollection]' );

var ModelClass = require('../models/PendingRequestModel');

module.exports = Backbone.Collection.extend({

    model : ModelClass,

    initialize : function(){
        debug('#initialize');
        var self = this;
        this.on("remove", function(request){
            this._lastRequest = request;
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
    },

    getLastRequest : function(){
        if(this._lastRequest){
            return this._lastRequest.toJSON();
        }
        return {};
    }

});
