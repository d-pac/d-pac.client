'use strict';

const {extend, each, isString} = require('lodash');

module.exports.mixin = function (Constructor) {
    extend(Constructor.prototype, {
        relayEvents: function (from,
                               events,
                               to) {
            each(events, (event)=> {
                if (isString(event)) {
                    event = {
                        [event]: event
                    };
                }
                each(event, (target,
                               source)=>this.remapEvent(from, source, to, target));
            });
        },
        remapEvent: function (from,
                              source,
                              to,
                              target) {
            from.vent.on(source, function (...args) {
                to.dispatch.apply(to, [target].concat(args));
            });
        },
    });
};
