( function() {
	if( !( 'function' != typeof document.getElementsByClassName || 'undefined' == typeof window.addEventListener ||
		!( 'classList' in document.createElement( 'div' ) ) || 980 > window.innerWidth ) ) {
		var overlay = document.createElement( 'div' ),
			notification = document.createElement( 'span' ),
			img = document.createElement( 'img' ),
			open = function( src, alt ) {
				img.src = src;
				img.alt = alt;

				overlay.setAttribute( 'aria-hidden', false );
				overlay.classList.add( 'zoomer_visible' );

				notification.innerHTML = 'Otworzono powiększenie screenshota. Naciśnij <kbd>Esc</kbd>, aby zamknąć.';

				document.addEventListener( 'click', close, false );
				document.addEventListener( 'keydown', escHandler, false );
			},
			escHandler = function( evt ) {
				if ( evt.keyCode !== 27 ) {
					return true;
				}

				evt.preventDefault();
				close();
			},
			close = function() {
				img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
				img.alt = '';

				overlay.setAttribute( 'aria-hidden', true );
				overlay.classList.remove( 'zoomer_visible' );

				document.removeEventListener( 'click', close, false );
				document.removeEventListener( 'keydown', escHandler, false );
			};

		img.classList.add( 'zoomer__image' );
		img.alt = '';

		notification.classList.add( 'accessible' );
		notification.setAttribute( 'aria-live', 'assertive' );

		overlay.classList.add( 'zoomer' );
		overlay.appendChild( img );
		overlay.appendChild( notification );
		document.body.appendChild( overlay );

		for( var zoomLinks = document.getElementsByClassName( 'project__screenshot__zoom' ), i = 0; i < zoomLinks.length; ++i )
			zoomLinks[ i ].addEventListener( 'click', function( evt ) {
				if ( !this.href ) {
					return true;
				}

				evt.preventDefault();
				evt.stopPropagation();

				open( this.href, this.parentNode.parentNode.getElementsByClassName( 'project__name' )[ 0 ].textContent + ' – screenshoot' );
			}, false );
	}
} () );
