// Generated on 2014-06-26 using generator-webapp 0.4.9
'use strict';

var konfy = require( 'konfy' );

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function( grunt ){
    var pkg = grunt.file.readJSON('package.json');
    process.env.APP_VERSION = pkg.version + " (" + pkg.build + ")";

    if( grunt.option( 'env' ) ){
        process.env.NODE_ENV = grunt.option( 'env' );
    }
    konfy.load();

    // Time how long tasks take. Can help when optimizing build times
    require( 'time-grunt' )( grunt );

    // Load grunt tasks automatically
    require( 'jit-grunt' )( grunt, {
        useminPrepare : 'grunt-usemin',
        buildnumber: "grunt-build-number"
    } );

    // Configurable paths
    var config = {
        app   : 'app',
        dist  : 'dist',
        bower : grunt.file.readJSON( '.bowerrc' ).directory
    };

    // Define the configuration for all the tasks
    grunt.initConfig( require( 'load-grunt-configs' )( grunt, {
        config : config,
        env : process.env,
        buildnumber : {
            files : ['package.json']
        }
    } ) );

//    console.log(grunt.config);

    grunt.registerTask('postBowerInstall', ['copy:zeroclipboard']);

    grunt.registerTask( 'serve', function( target ){
        if( target === 'dist' ){
            return grunt.task.run( ['build', 'connect:dist:keepalive'] );
        }

        grunt.task.run( [
            'clean:server',
            'webpack',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ] );
    } );

    grunt.registerTask( 'test', function( target ){
        if( target !== 'watch' ){
            grunt.task.run( [
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ] );
        }

        grunt.task.run( [
            'connect:test',
            'mocha'
        ] );
    } );

    grunt.registerTask( 'build', [
        'buildnumber',
        'clean:dist',
        'webpack',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'modernizr',
        'rev',
        'usemin',
        'htmlmin',
        'uglify:viewerjs'
    ] );

    grunt.registerTask( 'default', [
        'newer:jshint',
        'test',
        'build'
    ] );

    grunt.registerTask( 'deploy', ['build', 'rsync:app'] );
};
