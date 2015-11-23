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
          'dist/formbar-min.js',
          'dist/plugins/chameleon-plugin-min.js',
          'dist/plugins/dashed-plugin-min.js',
          'dist/plugins/dotted-plugin-min.js',
          'dist/plugins/gradient-plugin-min.js', 
          'dist/plugins/merge-plugin-min.js',          
          'dist/plugins/sections-plugin-min.js'
          ],        
          dest: 'dist/formbar-all-min.js'
        }]
      }      
    },
    copy: {
      example: {
      	src: 'dist/formbar-all-min.js',
      	dest: 'examples/formbar-all-min.js'
      }
  	},
  	watch: {
			scripts: {
				files: '**/*.js',
				tasks: ['default'],
			}
		}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy'); 
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['uglify', 'concat', 'copy']);
}
