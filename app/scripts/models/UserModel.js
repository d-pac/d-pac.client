'use strict';
var debug = require( 'debug' )( 'dpac:models', '[UserModel]' );
module.exports = Backbone.NestedModel.extend({
    defaults : {
        name : {
            first : "",
            last : ""
        },
        email: "",
        password : "",
        password_confirm : ""
    },

    initialize : function(){
        debug('#initialize');
    }
});
