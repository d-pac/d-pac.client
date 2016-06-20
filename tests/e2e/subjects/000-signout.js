'use strict';

module.exports = {
    after: function( client ){
        client.end();
    },

    'redirects to signin': function( client ){
        client
            .signout()
            .assert.urlEquals( client.page.signin().url );
    }
};
