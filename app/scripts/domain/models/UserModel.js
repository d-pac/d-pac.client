'use strict';

module.exports = Backbone.NestedModel.extend({
    defaults : {
        name : {
            first : "",
            last : ""
        },
        email: "",
        password : ""
    }
});
