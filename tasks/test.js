//TEST with grover
var exec = require('child_process').execSync,
    path = require('path');
    
module.exports = function( grunt ){  
  grunt.registerTask('test', 'Testing with grover', function(){
  	grunt.log.writeln( exec('grover tests/*.html') );
  })
}
