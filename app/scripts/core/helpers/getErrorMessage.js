'use strict';

module.exports = function getErrorMessage(err){
    var messageKey = S(err.reason.message).slugify().s;
    //console.log(messageKey);
    return i18n.t( ["errors:"+messageKey, err.reason.message] );
};
