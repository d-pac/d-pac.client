'use strict';

var debug = require( 'debug' )( 'dpac:core.controllers', '[SetupRemoteRequests]' );
var requestLog = require( 'debug' )( 'dpac:requests' );
var methodMap = {
    'create' : 'POST',
    'update' : 'PUT',
    'patch'  : 'PATCH',
    'delete' : 'DELETE',
    'read'   : 'GET'
};

var SetupRemoteRequests = module.exports = function SetupRemoteRequests(){
};
_.extend( SetupRemoteRequests.prototype, {
    wiring : ['config'],

    execute : function(){
        debug( '#execute' );
        var config = this.config;
        var dispatch = this.dispatch;
        var backboneSync = Backbone.sync;
        Backbone.sync = function( method,
                                  model,
                                  options ){
            var rid = uuid.v4();
            if( !options.crossDomain ){
                options.crossDomain = true;
            }

            if( !options.xhrFields ){
                options.xhrFields = {};
            }
            options.xhrFields.withCredentials = true;

            //inject host from config into `url`

            options = _.extend( options, {
                url : config.api.root + _.result( model, "url" )
            } );

            options.beforeSend = function( xhr ){
                xhr.setRequestHeader( 'Request-UUID', rid );
                requestLog( "\u279C", methodMap[method], options.url, "(" + rid + ")" );
            };

            var errorCallback = options.error;
            options.error = function( xhr ){
                var requestUUID = xhr.getResponseHeader( 'Request-UUID' );
                requestLog( "\u2718", methodMap[method], options.url, "(" + requestUUID + ")" );
                var errObj;
                if( xhr.responseJSON ){
                    errObj = {
                        err         : xhr.responseJSON,
                        requestUUID : requestUUID,
                        url         : options.url
                    }
                }else{
                    //something went REALLY wrong, most probably the server has died
                    errObj = {
                        err : { //let's fake an error object
                            code : 0,
                            message : "Server unreachable.",
                            explanation : "Could not connect."
                        },
                        url : options.url
                    }
                }
                dispatch( "backbone:sync:error", errObj );
                errorCallback.apply( null, arguments );
            };

            var successCallback = options.success;
            options.success = function( data,
                                        status,
                                        xhr ){
                requestLog( "\u2714", methodMap[method], options.url, "(" + xhr.getResponseHeader( 'Request-UUID' ) + ")" );
                successCallback.apply( null, arguments );
            };

            return backboneSync( method, model, options );
        };
    }
} );
