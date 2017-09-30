module.exports = function( config, page ) {
	'use strict';

	const subpages = config.subpages;
	const currentPage = `<span class="${ config.menu.hintClass }">(aktywna strona)</span>`;
	const menu = [ `<ul class="${ config.menu.mainClass }">` ];

	if ( typeof config.includeFrontInMenu === 'string' && config.includeFrontInMenu.length > 0 ) {
		menu.push( `<li class="${ config.menu.itemClass } logo">
			<a href="/" class="logo__link" title="Skocz na główną" lang="en" hreflang="pl">
				<span class="logo__text" lang="en">${ config.includeFrontInMenu }</span>
			</a>
		</li>` );
	}

	Object.keys( subpages ).forEach( ( subpage ) => {
		const current = subpages[ subpage ];

		if ( current.menu ) {
			menu.push( `<li class="${ config.menu.itemClass }">
				<a href="/${ subpage }.html"
					class="${ config.menu.linkClass }${ page === subpage ? ` ${ config.menu.activeClass }` : '' }">
					${ current.menu }
					${ page === subpage ? currentPage : '' }
				</a>
			</li>` );
		}
	} );

	menu.push( '</ul>' );

	return menu.join( '\n' );
};
