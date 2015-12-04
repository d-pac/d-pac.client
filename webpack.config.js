'use strict';

var webpack = require( 'webpack' );
var _ = require( 'lodash' );

var npm = require( './package.json' );
var bower = require( './bower.json' );
var vendorComponents = _.keys( npm.dependencies );
vendorComponents = vendorComponents.concat( _.keys( _.omit( bower.dependencies, "modernizr", "bootstrap-material-design" ) ) );

module.exports = {
    entry: {
        main: './<%= config.app %>/scripts/main.js',
        vendor: vendorComponents
    },
    resolve: {
        root: [ "./bower_components", "./node_modules", "." ],
        alias: {
            "debug": "bows/bows",
            "konfy": "konfy/lib/browser",
            "i18next": "i18next/i18next.commonjs.withJQuery",
            "zeroclipboard": "zeroclipboard/dist/ZeroClipboard",
            "snackbarjs": "snackbarjs/src/snackbar.js",
            "bootstrap-material-design": "bootstrap-material-design/dist/js/material",
            "modernizr": "modernizr/modernizr",
            "lity": "lity/dist/lity",
            "underscore": "lodash/index",
            //"d3-legend": "app/scripts/components/d3.legend",
            "d3-stock-plot": "app/scripts/components/d3-stock-plot"
        },
        packageAlias: "browser"
    },
    module: {
        loaders: [
            {
                test: /snackbar/,
                loader: "imports?jQuery=jquery!exports?jQuery.snackbar"
            },
            {
                test: /modernizr/,
                loader: "imports?this=>window!exports?window.Modernizr"
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            },
            {
                test: /backbone-nested-model/,
                loader: "imports?Backbone=backbone!exports?Backbone.NestedModel"
            },
            {
                test: /bootstrap-material-design/,
                loader: "imports?jQuery=jquery!exports?jQuery.material"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin( {
            'process.env': Object.keys( process.env ).reduce( function( o,
                                                                        k ){
                o[ k ] = JSON.stringify( process.env[ k ] );
                return o;
            }, {} )
        } ),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( "bower.json", [ "main" ] )
        ),
        new webpack.ProvidePlugin( {
            jQuery: "jquery"
        } ),
        new webpack.optimize.CommonsChunkPlugin( 'vendor.js' )
    ]
};
