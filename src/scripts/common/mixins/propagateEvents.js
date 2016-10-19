'use strict';

const {each} = require('lodash');

module.exports.mixin = function (Constructor) {
    return {
        propagate: function propagate(events) {
            Constructor.prototype.__propagateEvents_overridden__initialize = Constructor.prototype.initialize;
            Constructor.prototype.initialize = function (...args) {
                each(events, (to,
                              from)=> {
                    this.listenTo(this, from, (...args)=>{
                        this.dispatch(to, args);
                    });
                });
                Constructor.prototype.__propagateEvents_overridden__initialize.apply(this, args);
            };
        }
    };
};
