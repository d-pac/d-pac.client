'use strict';

const _ = require( 'lodash' );
const $ = require( 'jquery' );

const singleton = {};

const logger = function(...args){
    const ns = args.join( ' ' );
    if(this.filter && ns.match(this.filter)){
        const output = $( '#log' );
        const debug = function( ...args ){
            const message = args.join(', ');
            output.prepend( `${ns} ${message} <br/>` );
        };
        return debug;
    }else{
        return _.noop;
    }
}.bind(singleton);

logger.config = function(opts){
    if(opts.filter){
        this.filter = opts.filter;
    }
}.bind(singleton);

module.exports = logger;

