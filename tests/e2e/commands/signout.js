'use strict';
module.exports.command = function(){

    this
        .page.signout()
        .navigate()
        .waitForElementVisible( 'body', this.globals.timeout );

    return this;
};
