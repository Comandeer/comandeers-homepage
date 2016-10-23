module.exports = {
	main: {
		files: {
			[ `dist/js/loader.${ global.config.timestamp }.js` ]: 'js/loader.js',
			[ `dist/js/zoom.${ global.config.timestamp }.js` ]: 'js/zoom.js',
			[ `dist/js/menu.${ global.config.timestamp }.js` ]: 'js/menu.js'
		}
	}
};
