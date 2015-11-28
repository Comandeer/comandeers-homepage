module.exports = function(grunt)
{
	grunt.registerTask('configure', function()
	{
		var fs = require( 'fs' )
		,config = global.config
		,dist = config.distCSS
		,manifest = config.manifest
		,images = config.optimizeImages
		,files = {};

		try
		{
			fs.mkdirSync('dist');
			fs.mkdirSync('hashes');
			fs.mkdirSync('hashes/js');
			fs.mkdirSync('hashes/css');
		}
		catch(e) {console.log(e)}
	
		if(manifest)
		{
			grunt.config.set('manifest.main.src', manifest.src);
			grunt.config.set('manifest.main.dest', 'dist/' + manifest.dest + '.appcache');
		}

		if(Array.isArray(images) && images.length > 0)
			images.forEach(function(t)
			{
				grunt.config.set('imagemin.main.files', grunt.config.get('imagemin.main.files').concat(
				{
					expand: true
					,cwd: 'dist/' + t
					,src: [
						'**/*.png'
						,'**/*.gif'
						,'**/*.jpg'
					]
					,dest: 'dist/' + t
				}));
			});
	});
};
