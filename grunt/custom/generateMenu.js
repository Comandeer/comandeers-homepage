module.exports = function(grunt)
{
	grunt.registerTask('generateMenu', function()
	{
		var config = global.config;

		if(!config.generateMenu)
			return;

		var subpages = config.subpages
		,menu = [
			'<ul>'
		];

		if(typeof config.includeFrontInMenu === 'string' && config.includeFrontInMenu.length > 0)
			menu.push('<li><a href="' + config.frontPage + '.html">' + config.includeFrontInMenu + '</a></li>');

		Object.keys(subpages).forEach(function(t)
		{
			var current = subpages[t];
			if(current.menu)
				menu.push('<li><a href="' + t + '.html">' + (current.menu) + '</a></li>');
		});

		menu.push('</ul>');
		
		config.menu = menu.join('\n');
	});
};
