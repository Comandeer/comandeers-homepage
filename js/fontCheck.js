(function()
{
	try
	{
		if(localStorage.getItem('fontLoaded') == 2)
			document.documentElement.className += ' fl';
	}
	catch(e) {}
}())
