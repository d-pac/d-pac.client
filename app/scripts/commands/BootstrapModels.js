'use strict';
var debug = require( 'bows' )( 'dpac:commands' );
var UserModel = require('../models/UserModel');

var BootstrapModels = module.exports = function BootstrapModels(){};
_.extend(BootstrapModels.prototype, {
    execute : function(){
        debug.log('BootstrapModels#execute');
        this.context.wireValue('userModel', new UserModel({id:'me'}) );
    }
});
