module.exports = function( grunt ){

  grunt.initConfig({
    clean: {
    	dist: ['dist']
    },
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
      }
    },
    concat: {
       options: {
       	separator: ';'
       },
       mixedPlugins: {
        files: [
          { src: ['dist/formbar-min.js','dist/plugins/chameleon-plugin-min.js'], dest: 'dist/formbar-chameleon-min.js'},
          { src: ['dist/formbar-min.js','dist/plugins/dashed-plugin-min.js'], dest: 'dist/formbar-dashed-min.js' },
          { src: ['dist/formbar-min.js','dist/plugins/dotted-plugin-min.js'], dest: 'dist/formbar-dotted-min.js' },
          { src: ['dist/formbar-min.js','dist/plugins/gradient-plugin-min.js'], dest: 'dist/formbar-gradient-min.js' },
          { src: ['dist/formbar-min.js','dist/plugins/merge-plugin-min.js'], dest: 'dist/formbar-merge-min.js' },
          { src: ['dist/formbar-min.js','dist/plugins/sections-plugin-min.js'], dest: 'dist/formbar-sections-min.js' }
        ]
      },
      allPlugins: {
        files: [{
          src: [
          'dist/formbar-chameleon-min.js',
          'dist/formbar-dashed-min.js',
          'dist/formbar-dotted-min.js',
          'dist/formbar-gradient-min.js',
          'dist/formbar-merge-min.js',
          'dist/formbar-sections-min.js'
          ],        
          dest: 'dist/formbar-all-min.js'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean'); 
  
  grunt.registerTask('default', ['uglify', 'concat']);
}
