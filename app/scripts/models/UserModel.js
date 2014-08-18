'use strict';
var debug = require( 'bows' )( 'dpac:models' );
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
    urlRoot : 'http://localhost:3020/api/users',
    initialize : function(){
        debug('UserModel#initialize');
    }
});
