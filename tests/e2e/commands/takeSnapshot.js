'use strict';

const _ = require( 'lodash' );
const path = require( 'path' );

module.exports.command = function( module,
                                   extra ){
    if( !module ){
        throw new Error( '`module` must be provided' );
    }

    let basename = path.basename( module.filename, path.extname( module.filename ) );
    if( extra ){
        basename += '-' + _.kebabCase( extra );
    }
    this.saveScreenshot( `screenshots/${basename}.png` );
    return this;
};
