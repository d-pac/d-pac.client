'use strict';
const {extend, noop} = require('lodash');

module.exports.collection = {

    mixin: function (collectionClass) {

        extend(collectionClass.prototype, {
            teardown: function () {
                if (!this._teardown_completed) {
                    this._teardown_completed = true;
                    var callback;
                    this.sync = noop;
                    if (this.onTeardown) {
                        callback = this.onTeardown();
                    }
                    this.forEach(function (model) {
                        if (model.teardown) {
                            model.teardown();
                        }
                    });
                    this.reset();
                    this.stopListening();
                    if (callback) {
                        callback.call(this);
                    }
                }
            }
        });

    }
};

module.exports.model = {
    mixin: function (modelClass) {
        extend(modelClass.prototype, {
            teardown: function () {
                if (!this._teardown_completed) {
                    this._teardown_completed = true;
                    var callback;
                    this.sync = this.save = this.fetch = this.destroy = noop;
                    if (this.onTeardown) {
                        callback = this.onTeardown();
                    }
                    this.stopListening();
                    this.clear({silent: true});
                    if (callback) {
                        callback.call(this);
                    }
                }
            }
        });
    }
};
