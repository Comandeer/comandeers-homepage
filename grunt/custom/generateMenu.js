module.exports = function( config, page ) {
	const subpages = config.subpages;
	const currentPage = `<span class="${ config.menu.hintClass }">(aktywna strona)</span>`;
	const menu = [ `<ul class="${ config.menu.mainClass }">` ];

	if ( typeof config.includeFrontInMenu === 'string' && config.includeFrontInMenu.length > 0 ) {
		menu.push( `<li class="${ config.menu.itemClass }">
			<a href="${ config.frontPage }.html"
				class="${ config.menu.linkClass }${ page === subpage ? ` ${ config.menu.activeClass }` : '' }">
				${ config.includeFrontInMenu }
				${ page === '' ? currentPage : '' }
			</a>
		</li>` );
	}

	Object.keys( subpages ).forEach( ( subpage ) => {
		const current = subpages[ subpage ];

		if ( current.menu ) {
			console.log( page, subpage );
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
