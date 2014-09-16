'use strict';

module.exports = function(){
    var backboneSync = Backbone.sync;
    Backbone.sync = function( method,
                              model,
                              options ){
        if( !options.crossDomain ){
            options.crossDomain = true;
        }

        if( !options.xhrFields ){
            options.xhrFields = {};
        }
        options.xhrFields.withCredentials = true;

        return backboneSync( method, model, options );
    };
};
