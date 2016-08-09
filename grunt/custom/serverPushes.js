module.exports = function(grunt)
{
	grunt.registerTask('serverPushes', function()
	{
		var fs = require('fs')
		,file = fs.existsSync( 'dist/.htaccess' ) ? fs.readFileSync('dist/.htaccess', 'utf8'): fs.readFileSync('apache/.htaccess', 'utf8')
		,config = global.config
		,pushes = config.serverPushes || {}
		,pages = Object.keys(config.subpages)
		,header = 'Header add Link "<{RES}>;rel=preload"'
		,pH = function(res)
		{
			return header.replace(/{RES}/g, res);
		}
		,template = `<Files "{FILE}">
			{RULES}
		</Files>\n`
		,templateAlways = `<FilesMatch "\\.html$">
			{RULES}
		</FilesMatch>\n`
		,output = '';

		if(pushes.always)
		{
			var alwaysRules = [];

			pushes.always.forEach(function(push)
			{
				alwaysRules.push(pH(push));
			});

			output += templateAlways.replace(/{RULES}/g, alwaysRules.join('\n'));
		}

		pages.push('index');

		pages.forEach(function(page)
		{
			var pageTemplate = template.replace(/{FILE}/g, page + '.html')
			,rules = [];

			//CSS
			if(fs.existsSync('dist/css/' + page + '.css'))
				rules.push(pH('/css/' + page + '.css'));
			else
				rules.push(pH('/css/main.css'));

			if(pushes[page])
				pushes[page].forEach(function(push)
				{
					rules.push(pH(push));
				});

			output += pageTemplate.replace(/{RULES}/g, rules.join('\n'));
		});

		fs.writeFileSync('dist/.htaccess', file.replace(/{PUSHES}/g, output), 'utf8');
	});
};
