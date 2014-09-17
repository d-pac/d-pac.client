'use strict';
var debug = require( 'debug' )( 'dpac:controllers', '[SetupHBSPartials]' );

var SetupHBSPartials = module.exports = function SetupHBSPartials(){
    debug( '#execute' );
    Handlebars.registerPartial( 'loading', require( '../views/templates/Loading.hbs' ) );
};
