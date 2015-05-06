'use strict';

var webpack = require('webpack');

module.exports = function( grunt,
                           opts ){
    return {
        tasks: {
            webpack: {
                dist: {
                    entry: './<%= config.app %>/scripts/main.js',
                    output: {
                        path: '.tmp/scripts/',
                        filename: "main.js"
                    },
                    resolve: {
                        root: ["./bower_components"],
                        alias: {
                            "debug": "bows/bows",
                            "konfy": "konfy/lib/browser",
                            "i18next": "i18next/i18next.commonjs.withJQuery",
                            "zeroclipboard": "zeroclipboard/dist/ZeroClipboard",
                            "backbone.select": "backbone.select/dist/amd/backbone.select",
                            "bootstrap-validator": "bootstrap-validator/dist/validator",
                            "bootstrap-tour": "bootstrap-tour/build/js/bootstrap-tour",
                            "bootstrap-material-design": "bootstrap-material-design/dist/js",
                        },
                        packageAlias: "browser"
                    },
                    module: {
                        loaders: [
                            {
                                test: /\.hbs$/,
                                loader: "handlebars-loader"
                            }
                        ]
                    },
                    plugins: [
                        new webpack.DefinePlugin({
                          'process.env': Object.keys(process.env).reduce(function(o, k) {
                            o[k] = JSON.stringify(process.env[k]);
                            return o;
                          }, {})
                        }),
                        new webpack.ResolverPlugin(
                            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
                        ),
                        new webpack.ProvidePlugin({
                            jQuery: "jquery"
                        })
                    ]
                }
            }
        }
    }
};
