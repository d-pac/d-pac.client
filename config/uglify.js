'use strict';

module.exports = {
    viewerjs:{
        files : [
            {
                expand : true,
                cwd : "<%= config.dist %>/viewerjs",
                src : "**/*.js",
                dest : "<%= config.dist %>/viewerjs"
            }
        ]
    }
};
