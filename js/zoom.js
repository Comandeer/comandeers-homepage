(function()
{
	if(!('function' != typeof document.getElementsByClassName || 'undefined' == typeof window.addEventListener || 980 > window.innerWidth)) 
	{
		var overlay = document.createElement('div')
		,img = document.createElement('img')
		,open = function(src, alt)
		{
			img.src = src;
			img.alt = alt;

			overlay.setAttribute('aria-hidden', false);
			overlay.style.display = 'block';

			document.addEventListener('click', close, false);
			document.addEventListener('keydown', escHandler, false);
		}
		,escHandler = function(e)
		{
			if(e.keyCode !== 27)
				return true;

			e.preventDefault();
			close();
		}
		,close = function()
		{
			img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
			img.alt = '';

			overlay.setAttribute('aria-hidden', true);
			overlay.style.display = 'none';

			document.removeEventListener('click', close, false);
			document.removeEventListener('keydown', escHandler, false);
		};

		img.id = 'zoomer';
		img.alt = '';

		overlay.id = 'overlay';
		overlay.setAttribute('aria-hidden', true);
		overlay.appendChild(img);
		document.body.appendChild(overlay);

		for(var c = document.getElementsByClassName('zoom'), d = 0; d < c.length; ++d)
			c[d].addEventListener('click', function(e)
			{
				if(!this.href)
					return true;

				e.preventDefault();
				e.stopPropagation();

				open(this.href, this.parentNode.parentNode.getElementsByTagName('h3')[0].textContent + ' - screenshoot');
			}, false);
	}
}());
