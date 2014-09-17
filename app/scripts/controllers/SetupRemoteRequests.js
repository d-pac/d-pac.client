'use strict';

var debug = require('debug')( 'dpac:controllers', '[SetupRemoteRequests]' );
var requestLog = require('debug')('dpac:requests');
var methodMap = {
  'create': 'POST',
  'update': 'PUT',
  'patch':  'PATCH',
  'delete': 'DELETE',
  'read':   'GET'
};

module.exports = function(){
    debug('#execute');
    var backboneSync = Backbone.sync;
    Backbone.sync = function( method,
                              model,
                              options ){
        var rid= uuid.v4();
        if( !options.crossDomain ){
            options.crossDomain = true;
        }

        if( !options.xhrFields ){
            options.xhrFields = {};
        }
        options.xhrFields.withCredentials = true;

        options.beforeSend = function( xhr ){
            xhr.setRequestHeader( 'Request-UUID', rid );
            requestLog("\u279C", methodMap[method], model.url, "("+rid+")");
        };

        var errorCallback = options.error;
        options.error = function(xhr){
            requestLog("\u2718",methodMap[method], model.url, "("+xhr.getResponseHeader('Request-UUID')+")");
            errorCallback.apply(null, arguments);
        };

        var successCallback = options.success;
        options.success = function(data, status, xhr){
            requestLog("\u2714",methodMap[method], model.url, "("+xhr.getResponseHeader('Request-UUID')+")");
            successCallback.apply(null, arguments);
        };

        return backboneSync( method, model, options );
    };
};
