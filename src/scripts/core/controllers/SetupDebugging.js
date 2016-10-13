'use strict';

const Backbone = require('backbone'); //we need the full object

const debug = require( 'debug' );

module.exports = function SetupDebugging(){
    if (window.__backboneAgent) { // backbone inspector
      window.__backboneAgent.handleBackbone(Backbone);
    }
    debug.config( {
        padLength : 20,
        filter: "dpac"
    } );
};
