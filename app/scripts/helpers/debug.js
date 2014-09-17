'use strict';

var bows = require( 'bows' );
bows.config({
    padLength: 20
});


module.exports = function debug(ns){
    var logger = bows(ns);

    if(arguments.length>1){
        return _.partial.apply(null, [logger].concat( _.toArray(arguments ).slice(1)));
    }else{
        return logger;
    }
};
