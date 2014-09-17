'use strict';
var debug = require( 'debug' )( 'dpac:controllers', '[Signout]' );
var Signout = module.exports = function Signout(){};

_.extend(Signout.prototype, {
    wiring : ['authService'],
    execute : function execute(){
        debug('#execute');
        this.authService.signout();
    }
});
