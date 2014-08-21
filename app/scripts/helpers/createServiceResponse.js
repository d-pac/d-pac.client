'use strict';

module.exports = function createServiceResponse( err,
                                                 data ){
    if( false !== err ){
        return err.responseJSON || {
            status  : err.status,
            name    : err.statusText,
            message : err.statusText,
            code    : err.status,
            reason  : {
                message : err.statusText
            }
        };
    }

    return data;
};
