module.exports = function(grunt)
{
	grunt.registerTask('generateHumanstxt', function()
	{
		var config = global.config
		,fs = require('fs')
		,content = [
			'/* TEAM */'
		];

		config.humans.forEach(function(t)
		{
			content.push(t.title + ': ' + t.name + '\nSite: ' + t.site);
		});

		fs.writeFileSync('dist/humans.txt', content.join('\n'), 'utf8');
	});
};
