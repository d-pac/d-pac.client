'use strict';

module.exports = {
    after: function( client ){
        client.end();
    },

    '=> signin': function( client ){
        client
            .signout()
            .assert.urlEquals( client.page.signin().url );
    }
};
