'use strict';

const {extend} = require( 'lodash' );

const debug = require( 'debug' )( 'dpac:uploads.controllers', '[BootstrapUI]' );

const BootstrapDomain = module.exports = function BootstrapDomain(){
    //constructor
};
extend( BootstrapDomain.prototype, {
    execute: function(){
        debug( '#execute' );

        const context = this.context;
        context.wireView( 'MainView', require( '../views/MainView' ), {
            'overviewFactory': 'uploadsOverview'
        });
        context.wireView( 'uploadsOverview', require( '../views/UploadsOverview' ), {
            collection: "uploadsCollection"
        } );
    }
} );
