module.exports = function(grunt)
{
	grunt.registerTask('generateSitemap', function()
	{
		var fs = require('fs')
		,config = global.config;

		if(!config.sitemap)
			return;

		var uri = config.uri
		,subpages = config.subpages
		,sitemap = config.sitemap
		,now = new Date().toISOString()
		,content = [
			'<?xml version="1.0" encoding="UTF-8" ?>\n<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
			];

		content.push('<url>\n<loc>' + uri + '</loc>\n' + (sitemap.changeFreq ? '<changefreq>' + sitemap.changeFreq + '</changefreq>\n' : '') + (sitemap.lastMod ? '<lastmod>' + now + '</lastmod>\n' : '') + '</url>\n');

		Object.keys(subpages).forEach(function(t)
		{
			content.push('<url>\n<loc>' + uri + t + '.html</loc>\n' + (sitemap.changeFreq ? '<changefreq>' + sitemap.changeFreq + '</changefreq>\n' : '') + (sitemap.lastMod ? '<lastmod>' + now + '</lastmod>\n' : '') + '</url>\n')
		});

		content.push('</urlset>');

		fs.writeFileSync('dist/' + sitemap.fileName + '.xml', content.join('\n'), 'utf8');
	});
}
