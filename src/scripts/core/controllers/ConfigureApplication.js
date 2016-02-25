'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:core.controllers', '[ConfigureApplication]' );

module.exports = function ConfigureApplication(){
};

function parseValue( value,
                     defaultValue ){
    //undefined -> defaultValue
    //null -> defaultValue
    //0 -> 0
    //"0" -> 0
    //"true" -> true
    //"false" -> false
    //"foo" -> foo
    //{}-> {}

    var output;
    switch( typeof value ){
        case "undefined":
            output = defaultValue;
            break;
        case "symbol":
        case "object": //also applies to `null`, an array and any other shizzle
            output = value || defaultValue;
            break;
        case "number":
        case "boolean":
            output = value;
            break;
        case "string":
            if( value === "true" ){
                output = true;
            } else if( value === "false" ){
                output = false;
            } else if( !_.isNaN( Number( value ) ) ){
                output = Number( value );
            } else {
                output = value;
            }
            break;
        case "function":
            output = parseValue( value(), defaultValue );
            break;
        default: //we should never get here
            output = defaultValue;
    }
    return output;
}

_.extend( module.exports.prototype, {
    execute: function(){
        debug( '#execute' );
        var appVersionLabel = (process.env.APP_VERSION)
            ? 'v' + process.env.APP_VERSION
            : '[BROKEN]';
        if( process.env.APP_VERSION_LABEL && process.env.APP_VERSION_LABEL !== appVersionLabel ){
            appVersionLabel += '-' + process.env.APP_VERSION_LABEL;
        }

        var config = {
            "api": {
                "host": process.env.API_HOST,
                "root": process.env.API_HOST + "api"
            },
            "timelogs": {
                "interval": 5000,
                "shortcut": "ctrl+alt+s"
            },
            "errorlogs": {
                "shortcut": "ctrl+alt+d"
            },
            "app": {
                "version": appVersionLabel,
                "lang": process.env.APP_LANG || 'nl'
            },
            "slugs": {
                "welcome": "tool-welcome"
            },
            "features": {
                "tutorial": parseValue( process.env.FEATURE_TUTORIAL, true ),
                "account": parseValue( process.env.FEATURE_ACCOUNT, true ),
                "results": parseValue( process.env.FEATURE_RESULTS, true ),
                "assess": parseValue( process.env.FEATURE_ASSESS, true )
            }
        }
        this.context.wireValue( 'config', config );
        this.context.vent.trigger( 'config:load:completed' );
    }
} );

