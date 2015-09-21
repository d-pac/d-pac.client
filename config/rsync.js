'use strict';

module.exports = {
    options : {
        recursive : true
    },
    app     : {
        options : {
            src                : './dist/', //trailing slash REQUIRED [!]
            dest               : '<%= env.REMOTE_DEST %>',
            host               : ['<%= env.REMOTE_USERNAME %>', '@', '<%= env.REMOTE_HOST %>'].join( '' ),
            exclude            : ['*-mocks.js', '.git*', '.DS_Store', 'logs'],
            dryRun             : false,
            args               : ["--verbose"],
            syncDestIgnoreExcl : true
        }
    }
};
