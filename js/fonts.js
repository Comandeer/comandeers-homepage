(function(dE)
{
	if(dE.className.indexOf('fl') !== -1)
		return;

	if(!document.fonts || !document.fonts.load)
		return dE.className += 'fl';

	var p = document.createElement('p');

	p.className = 'fontTest';

	document.body.appendChild(p);

	document.fonts && document.fonts.load('1em Myriad').then(function()
	{
		dE.className += ' fl';

		localStorage.setItem('fontLoaded', 2);

		document.body.removeChild(p);
	}, function()
	{
		console.log('Font failed');
	});
}(document.documentElement));
