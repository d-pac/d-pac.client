'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:uploads.controllers', '[BootstrapDomain]' );

var BootstrapDomain = module.exports = function BootstrapDomain(){
    //constructor
};
_.extend( BootstrapDomain.prototype, {
    wiring: [ 'config' ],

    execute: function(){
        debug( '#execute' );

        var context = this.context;
        context.wireSingleton( 'representationsCollection', require( '../../common/models/RepresentationsCollection' ) );
        context.wireClass( 'uploadsCollection', require( '../models/UploadsCollection' ), {
            representationsCollection: 'representationsCollection',
            assessmentsCollection: 'assessmentsCollection'
        } );
        context.wireSingleton( 'navigationBlocker', require( './NavigationBlocker' ) );
        context.getObject( 'navigationBlocker' );
    }
} );
