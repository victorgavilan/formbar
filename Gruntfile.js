module.exports = function( grunt ){

  grunt.initConfig({
    clean: {
    	dist: ['dist']
    },
    uglify: {
      MinimizeAll: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.js'],        
          dest: 'dist/',
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
      allInOneFile: {
        files: [{
          src: [
          'dist/formbar-min.js',
          'dist/plugins/chameleon-plugin-min.js',
          'dist/plugins/dashed-plugin-min.js',
          'dist/plugins/dotted-plugin-min.js',
          'dist/plugins/gradient-plugin-min.js', 
          'dist/plugins/merge-plugin-min.js',          
          'dist/plugins/sections-plugin-min.js',
          'dist/behaviors/formbar-behavior-min.js',
          'dist/behaviors/timer-behavior-min.js'          
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
  	jshint: {
  		plugins: {
  			src: ['src/plugins/*.js']
  		},
  		behaviors: {
  			src: ['src/behaviors/*.js']
  		},
  		core: 'src/formbar.js'
  	},
  	watch: {
			scripts: {
				files: '**/*.js',
				tasks: ['test'],
			}
		}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy'); 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.loadTasks('tasks/');
  
  grunt.registerTask('default', ['jshint','uglify', 'concat', 'copy']);
}
