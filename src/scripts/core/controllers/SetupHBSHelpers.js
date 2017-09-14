'use strict';
const {extend, padLeft, template} = require( 'lodash' );
const Handlebars = require( 'handlebars/runtime' );

const debug = require( 'debug' )( 'dpac:core.controllers', '[SetupHBSHelpers]' );
const i18n = require( 'i18next' );
const moment = require( 'moment' );

module.exports = function SetupHBSHelpers(){
    //constructor
};
extend( module.exports.prototype, {
    wiring: ['config'],
    execute: function(){
        debug( '#execute' );

        function translate( i18n_key,
                            options ){
            const context = options.data.root;
            const opts = (context)
                ? i18n.functions.extend( options.hash, context )
                : options.hash;
            if( options.fn ){
                opts.defaultValue = options.fn( context );
            }

            const result = i18n.t( i18n_key, opts );
            return new Handlebars.SafeString( result );
        }

        Handlebars.registerHelper( 't', translate );
        Handlebars.registerHelper( 'toFixed', function( value ){
            const precision = (arguments.length === 3)
                ? arguments[ 1 ]
                : 2;
            const v = Number( value );
            return (isNaN(v))? "..." : v.toFixed( precision );
        } );

        Handlebars.registerHelper( 'duration', function( seconds ){
            const d = moment.duration( Number( seconds ), 'seconds' );
            return padLeft( Math.floor( d.asHours() ), 2, "0" ) + ":"
                + padLeft( d.minutes(), 2, "0" ) + ":"
                + padLeft( d.seconds(), 2, "0" );
        } );

        Handlebars.registerHelper( 'absurl', ( url )=>{
            const compiled = template(i18n.t( url ));
            return compiled(this.config);
        } );

        Handlebars.registerHelper( 'encodeURI', function( uri ){
            return encodeURIComponent( uri );
        } );

    }
});
