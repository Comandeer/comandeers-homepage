module.exports = function( config, page ) {
	'use strict';

	const links = config.menu.links;
	const currentPage = `<span class="${ config.menu.hintClass }">(aktywna strona)</span>`;
	const menu = [ `<ul class="${ config.menu.mainClass }">` ];

	if ( typeof config.includeFrontInMenu === 'string' && config.includeFrontInMenu.length > 0 ) {
		menu.push( `<li class="${ config.menu.itemClass } logo">
			<a href="/" class="logo__link" title="Skocz na główną" lang="en" hreflang="pl">
				<span class="logo__text" lang="en">${ config.includeFrontInMenu }</span>
			</a>
		</li>` );
	}

	Object.keys( links ).forEach( ( link ) => {
		const current = links[ link ];

		menu.push( `<li class="${ config.menu.itemClass }">
			<a href="${ current }"
				class="${ config.menu.linkClass }${ page === current ? ` ${ config.menu.activeClass }` : '' }">
				${ link }
				${ page === current ? currentPage : '' }
			</a>
		</li>` );
	} );

	menu.push( '</ul>' );

	return menu.join( '\n' );
};
