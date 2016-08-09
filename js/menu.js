( function( toggler ) {
	var id = toggler.getAttribute( 'href' ).substr( 1 ),
		menu = document.getElementById( id );

	function checkMenuVisibility( menu ) {
		return menu.classList.contains( 'nav--open' ) || location.hash === '#' + menu.id;
	}

	function toggleMenu( menu, toggler ) {
		var isVisible;

		menu.classList.toggle( 'nav--open' );
		isVisible = checkMenuVisibility( menu );

		toggler.setAttribute( 'aria-expanded', String( isVisible ) );
		menu.setAttribute( 'aria-expanded', String( isVisible ) );
	}

	toggler.setAttribute( 'role', 'button' );
	toggler.setAttribute( 'aria-controls', id );
	toggler.setAttribute( 'aria-label', 'Rozwiń/zwiń menu' );
	toggler.setAttribute( 'aria-expanded', String( checkMenuVisibility( menu ) ) );
	menu.setAttribute( 'aria-expanded', String( checkMenuVisibility( menu ) ) );

	toggler.addEventListener( 'keyup', function( evt ) {
		if ( evt.keyCode === 32 || evt.keyCode === 13 ) {
			evt.preventDefault();
			toggleMenu( menu, toggler );
		}
	}, false );
	toggler.addEventListener( 'click', function( evt ) {
		evt.preventDefault();
		toggleMenu( menu, toggler );
	}, false );
}( document.querySelector( '.header__nav-toggler' ) ) );
