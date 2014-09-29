'use strict';

module.exports = function( grunt,
                           opts ){
    return {
        tasks : {
            generate : {
                options : {
                    dest : "app/scripts",
                    map  : {
                        "Model"      : "models",
                        "ItemView"   : "views",
                        "Command"    : "controllers",
                        "Collection" : "collections"
                    }
                }
            }
        }
    };
};
