'use strict';
var _ = require( 'underscore' );
var $ = require('jquery');
var Backbone = require('backbone');

var debug = require( 'debug' )( 'dpac:core.controllers', '[SetupRemoteRequests]' );
var uuid = require( 'node-uuid' );
var requestLog = require( 'debug' )( 'dpac:requests' );
var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch': 'PATCH',
    'delete': 'DELETE',
    'read': 'GET'
};

var SetupRemoteRequests = module.exports = function SetupRemoteRequests(){
};
_.extend( SetupRemoteRequests.prototype, {
    wiring: [ 'config', 'pendingRequests' ],

    execute: function(){
        debug( '#execute' );
        var config = this.config;
        var dispatch = this.dispatch;
        var pendingRequests = this.pendingRequests;

        $.ajaxSetup( {
            timeout: 10000
        } );

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

            options = _.defaults( options, {
                url: _.result( model, "url" )
            } );
            options.url = config.api.root + options.url;

            options.beforeSend = function( xhr ){
                xhr.setRequestHeader( 'Request-UUID', rid );
                requestLog( "\u279C", methodMap[ method ], options.url, "(" + rid + ")" );
                pendingRequests.add( {
                    url: options.url,
                    uuid: rid
                } );
            };

            var errorCallback = options.error;
            options.error = function( xhr ){
                var requestUUID = xhr.getResponseHeader( 'Request-UUID' );
                requestLog( "\u2718", methodMap[ method ], options.url, "(" + requestUUID + ")" );
                pendingRequests.removeByUUID( requestUUID );
                var errObj;
                if( xhr.responseJSON ){
                    errObj = {
                        errors: xhr.responseJSON.errors,
                        requestUUID: requestUUID,
                        url: options.url,
                    }
                } else {
                    console.log( 'CONNECTION LOST OR TIME OUT' );
                    //something went REALLY wrong, most probably the server has died
                    errObj = {
                        errors: [
                            { //let's fake an error object
                                code: 0,
                                message: "Server unreachable.",
                                explanation: "Could not connect.",
                                fatal: true
                            }
                        ],
                        url: options.url
                    }
                }
                console.log( "REMOTE REQUEST ERROR", errObj );
                dispatch( "backbone:sync:error", errObj );
                errorCallback.apply( null, arguments );
            };

            var successCallback = options.success;
            options.success = function( data,
                                        status,
                                        xhr ){
                var requestUUID = xhr.getResponseHeader( 'Request-UUID' );
                requestLog( "\u2714", methodMap[ method ], options.url, "(" + requestUUID + ")" );
                pendingRequests.removeByUUID( requestUUID );
                successCallback.apply( null, arguments );
            };

            return backboneSync( method, model, options );
        };
    }
} );
