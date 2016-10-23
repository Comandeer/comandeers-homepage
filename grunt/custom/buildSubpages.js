module.exports = function( grunt ) {
	grunt.registerTask( 'buildSubpages', function() {
		var config = global.config,
			timestamp = config.timestamp,
			fs = require( 'fs' ),
			sri = require( `${ process.cwd() }/payload.json` ),
			mainCSS = `css/main.${ timestamp }.css`,
			layout = fs.readFileSync( `templates/${ config.layout }.html`, 'utf8' ),
			frontPage = fs.readFileSync( `templates/${ config.frontPage }.html`, 'utf8' ),
			subpages = config.subpages,
			includeJS = function( str ) {
				return str.replace( /{JS:"(.+?)"}/g, function( tag, name ) {
					var content = fs.readFileSync( `dist/js/${ name }.${ timestamp }.js` );

					return content;
				} );
			}
			includeSRI = function( str ) {
				return str.replace( /{SRI:(.+?)}/g, function( tag, name ) {
					name = name.split( '.' );

					name.splice( name.length - 1, 0, timestamp );

					return sri[ `@dist/${ name.join( '.' ) }` ].integrity;
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

		Object.keys( subpages ).forEach( function( subpage ) {
			var content = fs.readFileSync( `templates/${ subpage }.html`, 'utf8' ),
				CSSName = `css/${ subpage }.${ timestamp }.css`,
				link = fs.existsSync( `dist/${ CSSName }` ) ? CSSName : mainCSS,
				str = fs.readFileSync( `dist/${ link }`, 'utf8' ),
				css = {
					link: link,
					str: str
				};

			fs.writeFileSync( `dist/${ subpage }.html`, replacer( content, subpages[ subpage ], css, subpage ), 'utf8' );
		} );

		fs.writeFileSync( `dist/${ config.frontPage }.html`, replacer( frontPage, {
		    	decription: config.description
		    }, {
			link: mainCSS,
			str: fs.readFileSync( `dist/${ mainCSS }`, 'utf8' )
		} ),'utf8' );
	} );
};
