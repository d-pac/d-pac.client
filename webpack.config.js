'use strict';

const pkg = require( './package.json' );
process.env.APP_VERSION = pkg.version;

const konfy = require( 'konfy' );
konfy.load();
const webpack = require( 'webpack' );
const _ = require( 'lodash' );
const path = require( 'path' );

const bower = require( './bower.json' );
let vendorComponents = _.keys( pkg.dependencies );
vendorComponents = vendorComponents.concat( _.keys( bower.dependencies ) );

const htmlWPPlugin = require('html-webpack-plugin');

var dir_js = path.resolve(__dirname, './src/scripts');

const CHUNK_FILENAME = '[name].[chunkhash:8].js';

module.exports = {
    entry: {
        main: './src/scripts/main.js',
        vendor: vendorComponents,
        //common: commonFiles
    },
    output: {
        path: path.join( __dirname, "dist" ),
        publicPath: '',
        filename: CHUNK_FILENAME,
        chunkFilename: CHUNK_FILENAME
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
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(svg|woff|woff2|eot|ttf|otf)(\?.*$|$)/,
                loader: "url-loader?limit=10000"
            },
            {
                loader: 'babel-loader',
                test: dir_js,
                exclude: /\.hbs$/
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
        new webpack.optimize.CommonsChunkPlugin( 'vendor', CHUNK_FILENAME, Infinity ),
        new htmlWPPlugin({
            hash: false, //hashing is handled by filename
            filename: 'index.html',
            inject: 'body',
            template: __dirname + '/src/web/index.html'
        })
        //new webpack.optimize.CommonsChunkPlugin( {
        //    name: 'common',
        //    filename: 'common.js',
        //    chunks: [ 'assess', 'results' ],
        //    async: true
        //} )
    ]
};
