'use strict';
var _ = require( 'lodash' );
var Handlebars = require( 'handlebars/runtime' );

var debug = require( 'debug' )( 'dpac:core.controllers', '[SetupHBSHelpers]' );
var i18n = require( 'i18next' );
var moment = require( 'moment' );
var mediaTemplates = {
    "text/html": require( '../views/templates/media/html.hbs' ),
    "image/png": require( '../views/templates/media/image.hbs' ),
    "image/jpeg": require( '../views/templates/media/image.hbs' ),
    "image/svg+xml": require( '../views/templates/media/image.hbs' ),
    "application/pdf": require( '../views/templates/media/pdf.hbs' )
};

module.exports = function SetupHBSHelpers(){
    debug( '#execute' );

    function translate( i18n_key,
                        options ){
        var context = options.data.root;
        var opts = (context)
            ? i18n.functions.extend( options.hash, context )
            : options.hash;
        if( options.fn ){
            opts.defaultValue = options.fn( context );
        }

        var result = i18n.t( i18n_key, opts );
        return new Handlebars.SafeString( result );
    }

    Handlebars.registerHelper( 't', translate );
    Handlebars.registerHelper( 'toFixed', function( value ){
        var precision = (arguments.length === 3)
            ? arguments[ 1 ]
            : 2;
        return Number( value ).toFixed( precision );
    } );

    Handlebars.registerHelper( 'duration', function( seconds ){
        var d = moment.duration( Number( seconds ), 'seconds' );
        return _.padLeft( d.hours(), 2, "0" ) + ":"
            + _.padLeft( d.minutes(), 2, "0" ) + ":"
            + _.padLeft( d.seconds(), 2, "0" );
    } );

    _.each( mediaTemplates, function( tpl,
                                      name ){
        Handlebars.registerPartial( name, tpl );
    } );
    Handlebars.registerHelper( 'getMediaPlayer', function(mimeType){
        return mediaTemplates[mimeType || "text/html"];
    } )
};
