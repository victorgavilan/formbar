module.exports = function( grunt ){

  var plugins = ['dashed', 'merge', 'sections', 'solid'],
      behaviors = ['progressbar', 'formbar', 'timerbar'],
      effects = ['chameleon', 'striped', 'gradient'],
      outDir = 'dist',
      createGroups = function( ){
      	var files = [],
           	core = outDir + '/custom/vbar-core-min.js',            
            obj;
      	behaviors.forEach( function( behavior ){
      		plugins.forEach( function( plugin ){
      			obj = {};
      			obj.src = [ 
      				core, 
      				outDir + '/custom/plugins/' + plugin + '-plugin-min.js',
      				outDir + '/custom/behaviors/' + behavior + '-behavior-min.js'	
      			];
      			
      			obj.dest = outDir + '/packages/' + behavior + '/vbar-'+ behavior + '-' + plugin + '-min.js';
      			
      			files.push( obj );
      		});      	
      	});
      	
      	return files;
      },
      mixAll = function(){
      	var files = [],
      	   	obj = {
      	   		src: [ outDir + '/custom/vbar-core-min.js'],
      	   		dest: outDir + '/vbar-all-min.js'
      	   	};
      	   	
      	plugins.forEach( function( plugin ){
      		obj.src.push( outDir + '/custom/plugins/' + plugin + '-plugin-min.js');
      	});
      	
      	behaviors.forEach( function( behavior ){
      		obj.src.push( outDir + '/custom/behaviors/' + behavior + '-behavior-min.js');
      	});
      	
      	effects.forEach( function( effect ){
      		obj.src.push( outDir + '/custom/effects/' + effect + '-effect-min.js');
      	});
      	      	
      	return obj;      	
      };

  grunt.initConfig({
    
    clean: {
    	dist: ['dist'],
    	tempDir: ['dist/plugins', 'dist/behaviors', 'dist/effects']
    	
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
    mkdir:{
		  all: {
		    options: {
		      create: ['dist/custom', 'dist/custom/plugins', 'dist/custom/behaviors', 'dist/custom/effects']
		    }
		  }
    },
    //Move files before concat
    rename: {
    	moveFiles: {
		  	files: [{
		        expand: true,
		        cwd: 'dist/',
		        src: ['effects/*.js', 'plugins/*.js', 'behaviors/*.js', 'vbar-core-min.js'],        
		        dest: 'dist/custom/'
		      }]
			}
			
    },
    concat: {
       options: {
       	separator: ';'
       },
       mixedPlugins: {
        files: createGroups()
      },
      allInOneFile: {
        files: [ mixAll() ]
      }            
    },
    copy: {
      example: {
      	src: 'dist/vbar-all-min.js',
      	dest: 'examples/vbar-all-min.js'
      }
  	},
  	jshint: {
  		plugins: {
  			src: ['src/plugins/*.js']
  		},
  		behaviors: {
  			src: ['src/behaviors/*.js']
  		},
  		effects: {
  			src: ['src/effects/*.js']
  		},
  		core: 'src/vbar-core.js'
  	},
  	watch: {
			scripts: {
				files: ['src/*.js', 'src/**/*.js'],
				tasks: ['default'],
			}
		}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy'); 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-rename');
  grunt.loadNpmTasks('grunt-mkdir');
  
  grunt.loadTasks('tasks/');
  
  grunt.registerTask('default', ['clean:dist', 'jshint','uglify', 'mkdir', 'rename', 'concat', 'copy', 'clean:tempDir']);
}
