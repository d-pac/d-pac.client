'use strict';

var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:uploads.controllers', '[BootstrapUI]' );

var BootstrapDomain = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapDomain.prototype, {
    execute: function(){
        debug( '#execute' );

        var context = this.context;
        context.wireView( 'MainView', require( '../views/MainView' ), {
            'overviewFactory': 'uploadsOverview'
        });
        context.wireView( 'uploadsOverview', require( '../views/UploadsOverview' ), {
            collection: "uploadsCollection"
        } );
    }
} );
