// Generated on 2014-06-26 using generator-webapp 0.4.9
'use strict';
var konfy = require( 'konfy' );

module.exports = function( grunt ){
    konfy.load( function( err,
                          config ){
        initGrunt( grunt );
    } );
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

function initGrunt( grunt ){
    var pkg = grunt.file.readJSON( 'package.json' );
    process.env.APP_VERSION = (process.env.APP_VERSION_LABEL)
        ? pkg.version + "-" + process.env.APP_VERSION_LABEL
        : pkg.version;

    console.log( "APP_VERSION", process.env.APP_VERSION );

    // Time how long tasks take. Can help when optimizing build times
    require( 'time-grunt' )( grunt );

    // Load grunt tasks automatically
    require( 'jit-grunt' )( grunt, {
        useminPrepare: 'grunt-usemin'
    } );

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        bower: grunt.file.readJSON( '.bowerrc' ).directory
    };

    // Define the configuration for all the tasks
    grunt.initConfig( require( 'load-grunt-configs' )( grunt, {
        config: config,
        env: process.env
    } ) );

//    console.log(grunt.config);

    grunt.registerTask( 'serve', function( target ){
        if( target === 'dist' ){
            return grunt.task.run( [ 'build', 'connect:dist:keepalive' ] );
        }

        grunt.task.run( [
            'clean:server',
            'less',
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
        'clean:dist',
        'less',
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

    grunt.registerTask( 'deploy', [ 'build', 'rsync:app' ] );
}
