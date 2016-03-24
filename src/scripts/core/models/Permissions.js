'use strict';

var _ = require( 'lodash' );

var flags = {
    allowed: {
        value: 2,
        label: "allowed"
    },
    disabled: {
        value: 1,
        label: "disabled"
    },
    hidden: {
        value: 0,
        label: "hidden"
    }
};

_.each( flags, function( config,
                         flag ){
    flags[ config.value ] = config;
} );

function parseFlag( flag,
                    defaultValue ){
    var f = (flag)
        ? flag.toLowerCase()
        : null;
    switch( f ){
        case flags.disabled.value:
        case flags.allowed.value:
        case flags.hidden.value:
            return f;
        case flags.disabled.value.toString():
        case flags.disabled.label:
            return flags.disabled.value;
        case flags.hidden.value.toString():
        case flags.hidden.label:
            return flags.hidden.value;
        case flags.allowed.value.toString():
        case flags.allowed.label:
            return flags.allowed.value;
        case true:
        case 'true':
            return flags.allowed.value;
        case false:
        case 'false':
            return flags.hidden.value;
        default:
            if( f ){
                throw new Error( 'Unrecognized feature flag ' + f );
            }
            return defaultValue || flags.allowed.value;
    }
}

module.exports = {
    flags: flags,
    defaults: {
        "tutorial.view": parseFlag( process.env.FEATURE_TUTORIAL_VIEW ),
        "account.view": parseFlag( process.env.FEATURE_ACCOUNT_VIEW ),
        "account.update": parseFlag( process.env.FEATURE_ACCOUNT_UPDATE ),
        "assess.view": parseFlag( process.env.FEATURE_ASSESS_VIEW ),
        "results.view": parseFlag( process.env.FEATURE_RESULTS_VIEW ),
        "jwplayer.view": parseFlag( process.env.FEATURE_JWPLAYER_VIEW ),
        "admin.view": parseFlag( process.env.FEATURE_ADMIN_VIEW ),
        "uploads.view": parseFlag( process.env.FEATURE_UPLOADS_VIEW )
    }
};
