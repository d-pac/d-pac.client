'use strict';
var Handlebars = require( "hbsfy/runtime" );
Handlebars.registerHelper( 't', function( i18n_key,
                                          options ){
    console.log( arguments );
    var context = options.data.root;
    var opts = (context)
        ? i18n.functions.extend( options.hash, context )
        : options.hash;
    if( options.fn ){
        opts.defaultValue = options.fn( context );
    }

    var result = i18n.t( i18n_key, opts );
    return new Handlebars.SafeString( result );
} );

console.log( '--( MAIN )--' );
console.log( 'Backbone loaded', 'undefined' !== typeof Backbone );
console.log( 'Backbone.Marionette loaded', 'undefined' !== typeof Backbone.Marionette );
console.log( 'Jquery loaded', 'undefined' !== typeof $ );
console.log( 'Underscore/lodash loaded', 'undefined' !== typeof _ );
console.log( 'i18next loaded', 'undefined' !== typeof $.i18n );
var temp = require( './temp.js' );
console.log( temp.temp );

var tpl = require( './temp.hbs' );

$.i18n.init( {
    lng : "nl-BE",
    ns  : {
        namespaces : ['common'],
        defaultNs  : 'common'
    }
}, function( t ){
    console.log( t( "common:app.name" ) );
    console.log( tpl({
        username: "mofo"
    }) );
    console.log( tpl() );
} );
