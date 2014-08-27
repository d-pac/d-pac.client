'use strict';

module.exports = function(grunt, opts){
    return {
        tasks : {
            generate : {
                options : {
                    dest : "app/scripts",
                    map : {
                        "Model" : "models",
                        "View" : "views",
                        "Command" : "controllers"
                    }
                }
            }
        }
    };
};
