'use strict';

var Handlebars = require("hbsfy/runtime");

var debug = require( 'debug' )( 'dpac:core.controllers', '[SetupHBSPartials]' );

var SetupHBSPartials = module.exports = function SetupHBSPartials(){
    debug( '#execute' );
    Handlebars.registerPartial( 'loading', require( '../views/templates/Loading.hbs' ) );
};
