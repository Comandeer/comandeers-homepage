module.exports = function( grunt ) {
	'use strict';

	grunt.registerTask( 'buildSubpages', () => {
		const config = global.config;
		const timestamp = config.timestamp;
		const fs = require( 'fs' );
		const sri = require( `${ process.cwd() }/payload.json` );
		const generateMenu = require( './generateMenu' );
		const mainCSS = `css/main.${ timestamp }.css`;
		const layout = fs.readFileSync( `templates/${ config.layout }.html`, 'utf8' );
		const frontPage = fs.readFileSync( `templates/${ config.frontPage }.html`, 'utf8' );
		const subpages = config.subpages;

		function includeJS( str ) {
			return str.replace( /{JS:"(.+?)"}/g, ( tag, name ) => {
				const content = fs.readFileSync( `dist/js/${ name }.${ timestamp }.js` );

				return content;
			} );
		}

		function includeSRI( str ) {
			return str.replace( /{SRI:(.+?)}/g, ( tag, name ) => {
				name = name.split( '.' );

				name.splice( name.length - 1, 0, timestamp );

				return sri[ `@dist/${ name.join( '.' ) }` ].integrity;
			} );
		}

		function replacer( template, data, css, self ) {
			const menu = generateMenu( config, self );
			let output = layout.replace( /{CONTENT}/g, template );

			output = output.replace( /{CSS}/g, css.str );
			output = output.replace( /{CSSSRI}/g, sri[ `@dist/${ css.link }` ].integrity );
			output = output.replace( /{CSSLINK}/g, css.link );

			output = output.replace( /{DESCRIPTION}/g, data.description || config.description );
			output = output.replace( /{URI}/g, config.uri );
			output = output.replace( /{MENU}/g, menu );
			output = output.replace( /{SITETITLE}/g, config.title );
			output = output.replace( /{TITLE}/g, data.title || '' );
			output = output.replace( /{SELF}/g, self ? self + '.html' : '' );
			output = output.replace( /{TITLESEPARATOR}/g, data.title && config.titleSeparator || '' );
			output = output.replace( /{YEAR}/g, new Date().getFullYear() );

			//include JS
			output = includeJS( output );

			output = includeSRI( output );

			return output;
		}

		Object.keys( subpages ).forEach( ( subpage ) => {
			const content = fs.readFileSync( `templates/${ subpage }.html`, 'utf8' );
			const CSSName = `css/${ subpage }.${ timestamp }.css`;
			const link = fs.existsSync( `dist/${ CSSName }` ) ? CSSName : mainCSS;
			const str = fs.readFileSync( `dist/${ link }`, 'utf8' );
			const css = {
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
		} ), 'utf8' );
	} );
};
