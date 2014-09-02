'use strict';
var debug = require( 'bows' )( 'dpac:controllers' );
var Signout = module.exports = function Signout(){};

_.extend(Signout.prototype, {
    wiring : ['authService'],
    execute : function execute(){
        debug('Signout#execute');
        this.authService.signout();
    }
});
