module.exports = function(grunt)
{
	grunt.registerTask('csp', function()
	{
		var done = this.async()
		,config = global.config
		,fs = require('fs')
		,glob = require('glob')
		,file = fs.readFileSync('apache/.htaccess', 'utf8')
		,header = 'report-uri /report.php;default-src \'self\';'
		,generateHeader = function(type, hashes, additional)
		{
			var part = type + '-src \'self\'';

			hashes && hashes.forEach(function(hash)
			{
				part += " 'sha256-" + fs.readFileSync(hash, 'utf8') + "'";
			});

			return part + ' ' + (additional && additional.join(' ') || '') + ';';
		}

		if ( config.CSP ) {
			file = file.replace( /{CSP}/g, config.CSP );
			fs.writeFileSync('dist/.htaccess', file, 'utf8');
			return done();
		}

		//css
		glob('hashes/css/*.hash', function(err, hashes)
		{
			header += generateHeader('style', hashes);

			//js
			glob('hashes/js/*.hash', function(err, hashes)
			{
				header += generateHeader('script', hashes, ['*.google-analytics.com']);

				file = file.replace(/{CSP}/g, header);

				fs.writeFileSync('dist/.htaccess', file, 'utf8');

				done();
			});
		});
	});
};
