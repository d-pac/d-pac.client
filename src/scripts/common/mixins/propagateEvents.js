'use strict';

const {each} = require('lodash');

module.exports.mixin = function (Constructor) {
    return {
        propagate: function propagate(events) {
            Constructor.prototype.__propagateEvents_overridden__initialize = Constructor.prototype.initialize;
            Constructor.prototype.initialize = function (...initArgs) {
                each(events, (to,
                              from)=> {
                    this.listenTo(this, from, (...eventArgs)=>{
                        // might be invoked on a not yet wired instance,
                        // in which case it doesn't have a dispatch function yet
                        if(this.dispatch){
                            this.dispatch(to, ...eventArgs)
                        }
                    });
                });
                Constructor.prototype.__propagateEvents_overridden__initialize.apply(this, initArgs);
            };
        }
    };
};
