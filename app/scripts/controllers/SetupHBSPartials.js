'use strict';
var debug = require( 'bows' )( 'dpac:controllers' );

var SetupHBSPartials = module.exports = function SetupHBSPartials(){
    debug.log( 'SetupHBSPartials#execute' );
    Handlebars.registerPartial( 'loading', require( '../views/templates/Loading.hbs' ) );
};
