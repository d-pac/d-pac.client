'use strict';

module.exports = function(grunt, opts){
    return {
        tasks : {
            browserify : {
                dist : {
                    files : {
                        '.tmp/browserify/scripts/main.js' : ['<%= config.app %>/scripts/**/*.js']
                    }
                }
            }
        }
    }
}
