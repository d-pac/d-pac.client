'use strict';
var debug = require( 'bows' )( 'dpac:controllers' );

var SetupHBSPartials = module.exports = function SetupHBSPartials(){
};
_.extend( SetupHBSPartials.prototype, {
    execute : function(){
        debug.log( 'SetupHBSPartials#execute' );
        Handlebars.registerPartial('loading', require('../views/templates/Loading.hbs'));
    }
} );
