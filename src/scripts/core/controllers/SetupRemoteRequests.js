'use strict';
const {extend, defaults, result} = require('lodash');
const $ = require('jquery');
const Backbone = require('backbone'); //we need the full object

const debug = require('debug')('dpac:core.controllers', '[SetupRemoteRequests]');
const uuid = require('node-uuid');
const requestLog = require('debug')('dpac:requests');
const methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch': 'PATCH',
    'delete': 'DELETE',
    'read': 'GET'
};

const SetupRemoteRequests = module.exports = function SetupRemoteRequests() {
    //constructor
};
extend(SetupRemoteRequests.prototype, {
    wiring: ['config', 'pendingRequests'],

    execute: function () {
        debug('#execute');
        const config = this.config;
        const dispatch = this.dispatch;
        const pendingRequests = this.pendingRequests;

        $.ajaxSetup({
            timeout: 60000
        });

        const backboneSync = Backbone.sync;
        Backbone.sync = function (method,
                                  model,
                                  options) {
            const rid = uuid.v4();
            if (!options.crossDomain) {
                options.crossDomain = true;
            }

            if (!options.xhrFields) {
                options.xhrFields = {};
            }
            options.xhrFields.withCredentials = true;

            //inject host from config into `url`

            options = defaults(options, {
                url: result(model, "url")
            });
            options.url = config.api.root + options.url;

            options.beforeSend = function (xhr) {
                xhr.setRequestHeader('Request-UUID', rid);
                requestLog("\u279C", methodMap[method], options.url, "(" + rid + ")");
                pendingRequests.add({
                    url: options.url,
                    uuid: rid
                });
            };

            const errorCallback = options.error;
            options.error = function (...args) {
                const xhr = args[0];
                const requestUUID = xhr.getResponseHeader('Request-UUID');
                requestLog("\u2718", methodMap[method], options.url, "(" + requestUUID + ")");
                pendingRequests.removeByUUID(requestUUID);
                let errObj;
                if (xhr.responseJSON) {
                    errObj = {
                        errors: xhr.responseJSON.errors,
                        requestUUID: requestUUID,
                        url: options.url,
                    };
                } else {
                    console.log('CONNECTION LOST OR TIME OUT');
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
                    };
                }
                console.log("REMOTE REQUEST ERROR", errObj);
                if(!options.disableErrorPropagation){
                    dispatch("backbone:sync:error", errObj);
                }
                errorCallback(...args);
            };

            const successCallback = options.success;
            options.success = function (data,
                                        status,
                                        xhr,
                                        ...rest) {
                const requestUUID = xhr.getResponseHeader('Request-UUID');
                requestLog("\u2714", methodMap[method], options.url, "(" + requestUUID + ")");
                pendingRequests.removeByUUID(requestUUID);
                successCallback(data, status, xhr, ...rest);
            };

            return backboneSync(method, model, options);
        };
    }
});
