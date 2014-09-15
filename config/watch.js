module.exports = {
    bower      : {
        files : ['bower.json'],
        tasks : ['wiredep']
    },
    js         : {
        files   : ['<%= config.app %>/scripts/**/*.js'],
        tasks   : ['browserify'],
        options : {
            livereload : true
        }
    },
    hbs : {
        files : [ '<%= config.app %>/**/*.hbs'],
        tasks : ['browserify'],
        options : {
            livereload : true
        }
    },
    jstest     : {
        files : ['test/spec/{,*/}*.js'],
        tasks : ['test:watch']
    },
    gruntfile  : {
        files : ['Gruntfile.js']
    },
    styles     : {
        files : ['<%= config.app %>/styles/{,*/}*.css'],
        tasks : ['newer:copy:styles', 'autoprefixer']
    },
    livereload : {
        options : {
            livereload : '<%= connect.options.livereload %>'
        },
        files   : [
            '<%= config.app %>/{,*/}*.html',
            '.tmp/styles/{,*/}*.css',
            '<%= config.app %>/images/{,*/}*'
        ]
    }
};
