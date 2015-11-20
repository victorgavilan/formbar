module.exports = function( grunt ){

  grunt.initConfig({
    uglify: {
      formbar: {
        src: ['src/formbar.js'],
        dest: 'dist/formbar-min.js'
      },
      formbarPlugins: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*-plugin.js'],        
          dest: 'dist/plugins/',
          ext: '-min.js'
        }]
      },
      mixedPlugins: {
        files: [
          { src: ['src/formbar.js','chameleon-plugin.js'], dest: 'dist/formbar-chameleon-min.js'},
          { src: ['src/formbar.js','dashed-plugin.js'], dest: 'dist/formbar-dashed-min.js' },
          { src: ['src/formbar.js','dotted-plugin.js'], dest: 'dist/formbar-dotted-min.js' },
          { src: ['src/formbar.js','gradient-plugin.js'], dest: 'dist/formbar-gradient-min.js' },
          { src: ['src/formbar.js','merge-plugin.js'], dest: 'dist/formbar-merge-min.js' },
          { src: ['src/formbar.js','sections-plugin.js'], dest: 'dist/formbar-sections-min.js' }
        ]
      }
 
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
}
