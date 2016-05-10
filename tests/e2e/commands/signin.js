'use strict';

const config = require( '../config' );

module.exports.command = function(){

    this.page.signin()
        .navigate()
        .waitForElementVisible( 'body', this.globals.timeout )
        .signinUser( config.defaultUser )
    ;

    return this;
};
