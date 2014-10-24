module.exports = {
  dist: {
    files: {
      src: ['<%= config.dist %>/scripts/{,*/}*.js',
        '<%= config.dist %>/styles/{,*/}*.css',
        '<%= config.dist %>/styles/fonts/{,*/}*.*',
        '<%= config.dist %>/*.{ico,png}'
      ]
    }
  }
};
