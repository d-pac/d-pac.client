'use strict';
var debug = require( 'debug' )( 'dpac:assess.controllers', '[BootstrapDomain]' );

var BootstrapModels = module.exports = function BootstrapDomain(){
};
_.extend( BootstrapModels.prototype, {
    wiring : ['config'],

    execute : function(){
        debug( '#execute' );
        var context = this.context;
        context.wireSingleton( 'assessmentsCollection', require( '../collections/AssessmentsCollection' ) );
        context.wireView('MementoModel', require('../models/MementoProxy'), {
            parser : 'mementoParser'
        });
        context.wireSingleton( 'mementosCollection', require( '../collections/MementosCollection' ), {
            model : 'MementoModel'
        } );
        context.wireSingleton( 'mementoParser', require( '../services/MementoParser' ) );

        context.wireCommand( "mementos:selection:completed", require( './MementoController' ) );
    }
} );
