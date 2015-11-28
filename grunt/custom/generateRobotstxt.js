module.exports = function(grunt)
{
	grunt.registerTask('generateRobotstxt', function()
	{
		var config = global.config
		,fs = require('fs')
		,content = [
			'user-agent: *'
		]
		,robots = config.robots
		,sitemap = config.sitemap
		,uri = config.uri;

		if(robots.length < 1)
			content.push('disallow:');
		else
			robots.forEach(function(t)
			{
				content.push('disallow: ' + t);
			});

		if(sitemap)
			content.push('sitemap: ' + uri + sitemap.fileName + '.xml');
		
		fs.writeFileSync('dist/robots.txt', content.join('\n'), 'utf8');
	});
}
