'use strict';

var webpack = require( 'webpack' );
var _ = require( 'lodash' );

module.exports = function( grunt,
                           opts ){
    var npm = require( '../package.json' );
    var bower = require( '../bower.json' );
    var vendorComponents = _.keys( npm.dependencies );
    vendorComponents = vendorComponents.concat( _.keys( _.omit( bower.dependencies, "modernizr", "bootstrap-material-design" ) ) );
    vendorComponents = vendorComponents.concat( "bootstrap-material-design/material", "bootstrap-material-design/ripples" );
    return {
        tasks: {
            webpack: {
                dist: {
                    entry: {
                        main: './<%= config.app %>/scripts/main.js',
                        vendor: vendorComponents
                    },
                    output: {
                        path: '.tmp/scripts/',
                        filename: "[name].js"
                    },
                    resolve: {
                        root: [ "./bower_components" ],
                        alias: {
                            "debug": "bows/bows",
                            "konfy": "konfy/lib/browser",
                            "i18next": "i18next/i18next.commonjs.withJQuery",
                            "zeroclipboard": "zeroclipboard/dist/ZeroClipboard",
                            "backbone.select": "backbone.select/dist/amd/backbone.select",
                            "bootstrap-validator": "bootstrap-validator/dist/validator",
                            "bootstrap-tour": "bootstrap-tour/build/js/bootstrap-tour",
                            "bootstrap-material-design": "bootstrap-material-design/dist/js"
                        },
                        packageAlias: "browser"
                    },
                    module: {
                        loaders: [
                            {
                                test: /\.hbs$/,
                                loader: "handlebars-loader"
                            },
                            {
                                test: /bootstrap-tour/,
                                loader: "imports?jQuery=jquery!exports?window.Tour"
                            },
                            {
                                test: /backbone-nested-model/,
                                loader: "imports?Backbone=backbone!exports?Backbone.NestedModel"
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
                        new webpack.optimize.CommonsChunkPlugin('vendor.js')
                    ]
                }
            }
        }
    }
};
