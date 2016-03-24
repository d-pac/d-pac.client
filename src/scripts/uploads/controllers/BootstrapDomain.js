'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:uploads.controllers', '[BootstrapDomain]' );

var BootstrapDomain = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapDomain.prototype, {
    wiring: [ 'config' ],

    execute: function(){
        debug( '#execute' );

        var context = this.context;
        context.wireSingleton( 'representationsCollection', require( '../../common/collections/RepresentationsCollection' ) );
    }
} );
