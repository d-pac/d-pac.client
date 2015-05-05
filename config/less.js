'use strict';

module.exports = function(){
    return {
        tmp : {
            files: {
                '.tmp/styles/main.css': '<%= config.app %>/styles/main.less'
            }
        }
    }
};
