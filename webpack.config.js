'use strict';

var pkg = require( './package.json' );
process.env.APP_VERSION = pkg.version;

var konfy = require( 'konfy' );
konfy.load();
var webpack = require( 'webpack' );
var _ = require( 'lodash' );
var path = require( 'path' );

var bower = require( './bower.json' );
var vendorComponents = _.keys( pkg.dependencies );
vendorComponents = vendorComponents.concat( _.keys( bower.dependencies ) );

var dir_js = path.resolve(__dirname, './src/scripts');

module.exports = {
    entry: {
        main: './src/scripts/main.js',
        vendor: vendorComponents,
        //common: commonFiles
    },
    output: {
        path: path.join( __dirname, "dist/assets" ),
        publicPath: 'assets/',
        filename: '[name].js',
        chunkFilename: "[name].js"
    },
    devServer: {
        contentBase: "src/web/"
    },
    resolve: {
        modulesDirectories: [ "bower_components", "node_modules", "src/scripts/components" ],
        alias: {
            "debug": "bows",
            "bows": "bows/bows",
            "konfy": "konfy/lib/browser",
            "i18next": "i18next/i18next.commonjs.withJQuery",
            "bootstrap-material-design$": "bootstrap-material-design/scripts/material",
            "modernizr": "modernizr/modernizr",
            "lity$": "lity/src/lity",
            "underscore": "lodash/index",
        },
        packageAlias: "browser"
    },
    module: {
        loaders: [
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
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(svg|woff|woff2|eot|ttf|otf)(\?.*$|$)/,
                loader: "url-loader?limit=10000"
            },
            {
                loader: 'babel-loader',
                test: /.js$/,
            }
        ]
    },
    noParse: [
        './bower_components/jquery/dist/jquery.js'
    ],
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin( {
            'process.env': Object.keys( process.env ).reduce( function( o,
                                                                        k ){
                o[ k ] = JSON.stringify( process.env[ k ] );
                console.log( "env." + k, o[ k ] );
                return o;
            }, {} )
        } ),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( "bower.json", [ "main" ] )
        ),
        new webpack.ProvidePlugin( {
            jQuery: "jquery"
        } ),
        new webpack.optimize.CommonsChunkPlugin( 'vendor', 'vendor.js', Infinity ),
        //new webpack.optimize.CommonsChunkPlugin( {
        //    name: 'common',
        //    filename: 'common.js',
        //    chunks: [ 'assess', 'results' ],
        //    async: true
        //} )
    ]
};
