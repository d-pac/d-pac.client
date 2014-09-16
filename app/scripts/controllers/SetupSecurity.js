'use strict';

module.exports = function(){
};

_.extend(module.exports.prototype, {
    wiring : ['authService'],
    execute : function(){
        var backboneSync = Backbone.sync;
        Backbone.sync = function(method, model, options){
            if (!options.crossDomain) {
              options.crossDomain = true;
            }

            if (!options.xhrFields) {
              options.xhrFields = {withCredentials:true};
            }

            options.beforeSend = function(xhr){
                xhr.setRequestHeader('x-csrf-token', this.authService.getCSRFToken());
            };
            return backboneSync(method, model, options);
        };
    }
});
