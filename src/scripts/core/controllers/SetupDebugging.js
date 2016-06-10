'use strict';

const Backbone = require('backbone');

var debug = require( 'debug' );

module.exports = function SetupDebugging(){
    if (window.__backboneAgent) { // backbone inspector
      window.__backboneAgent.handleBackbone(Backbone);
    }
    debug.config( {
        padLength : 20,
        filter: "dpac"
    } );
};
