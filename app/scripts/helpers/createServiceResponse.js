'use strict';

module.exports = function createServiceResponse( err,
                                                 data ){
    var failed;
    if( err ){
        failed = err.responseJSON || {
            status : err.status,
            name   : err.statusText
        };
    }else{
        failed = false;
    }
    return {
        failed : failed,
        result   : data
    }
};
