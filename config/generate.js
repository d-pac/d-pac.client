'use strict';

module.exports = function( grunt,
                           opts ){
    return {
        tasks : {
            generate : {
                options : {
                    dest : "app/scripts",
                    map  : {
                        "Model"      : ":dir/models",
                        "ItemView"   : ":dir/views",
                        "Command"    : ":dir/controllers",
                        "Collection" : ":dir/collections"
                    }
                }
            }
        }
    };
};
