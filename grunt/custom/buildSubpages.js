module.exports = function( grunt ) {
	grunt.registerTask( 'buildSubpages', function() {
		var config = global.config,
		fs = require( 'fs' ),
		sri = require( `${ process.cwd() }/payload.json` ),
		crypto = require( 'crypto' ),
		layout = fs.readFileSync( 'templates/' + config.layout + '.html', 'utf8' ),
		frontPage = fs.readFileSync( 'templates/' + config.frontPage + '.html', 'utf8' ),
		subpages = config.subpages,
		includeJS = function( str ) {
			return str.replace( /{JS:"(.+?)"}/g, function( tag, name ) {
				var content = fs.readFileSync( 'dist/js/' + name + '.js' );

				return content;
			} );
		}
		includeSRI = function( str ) {
			return str.replace( /{SRI:(.+?)}/g, function( tag, name ) {
				return sri[ `@dist/${ name }` ].integrity;
			} );
		},
		replacer = function( template, data, css, self ) {
			var output = layout.replace( /{CONTENT}/g, template );

			output = output.replace( /{CSS}/g, css.str );
			output = output.replace( /{CSSSRI}/g, sri[ `@dist/${ css.link }` ].integrity );
			output = output.replace( /{CSSLINK}/g, css.link );

			output = output.replace( /{DESCRIPTION}/g, data.description || config.description );
			output = output.replace( /{URI}/g, config.uri );
			output = output.replace( /{MENU}/g, config.menu );
			output = output.replace( /{SITETITLE}/g, config.title );
			output = output.replace( /{TITLE}/g, data.title || '' );
			output = output.replace( /{SELF}/g, self ? self + '.html' : '' );
			output = output.replace( /{TITLESEPARATOR}/g, data.title && config.titleSeparator || '' );
			output = output.replace( /{YEAR}/g, new Date().getFullYear() );

			//include JS
			output = includeJS( output );

			output = includeSRI( output );

			return output;
		};
		try {
			fs.mkdirSync( 'hashes' );
			fs.mkdirSync( 'hashes/css' );
			fs.mkdirSync( 'hashes/js' );
		} catch( e ) {}
		Object.keys(subpages).forEach(function(t)
		{
			var subPage = fs.readFileSync('templates/' + t + '.html','utf8')
			,link = fs.existsSync('dist/css/' + t + '.css') ? 'css/' + t + '.css' : 'css/main.css'
			,str = fs.readFileSync('dist/' + link, 'utf8')
			,css = {
				link: link
				,str: str
			}
			,hash = crypto.createHash('sha256');

			hash.update(str);

			fs.writeFileSync('hashes/css/' + t + '.hash', hash.digest('base64'), 'utf8');

			fs.writeFileSync('dist/' + t + '.html', replacer(subPage, subpages[t], css, t),'utf8');
		});

		fs.writeFileSync('dist/' + config.frontPage + '.html', replacer(fs.readFileSync('templates/' + config.frontPage + '.html', 'utf8'), {decription: config.description}, {
			link: 'css/main.css'
			,str: fs.readFileSync('dist/css/main.css', 'utf8')
		}),'utf8');
	});
};
