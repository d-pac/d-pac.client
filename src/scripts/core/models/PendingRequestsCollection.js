'use strict';
const {Collection} = require('backbone');

const debug = require( 'debug' )( 'dpac:core', '[PendingRequestsCollection]' );

const ModelClass = require('../models/PendingRequestModel');

module.exports = Collection.extend({

    model : ModelClass,

    initialize : function(){
        debug('#initialize');
        this.on("remove", (request)=>{
            this._lastRequest = request;
            if(this.isEmpty() ){
                this.dispatch("requests:pending:empty");
            }
        });
    },

    removeByUUID : function(uuid){
        const model = this.findWhere({
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
