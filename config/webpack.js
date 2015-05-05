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
                        alias: {
                            "debug": "bows",
                            "konfy": "konfy/lib/browser"
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
                        })
                    ]
                }
            }
        }
    }
};
