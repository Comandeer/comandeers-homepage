module.exports = {
	main: {
		options: {
			yuicompress: false
		},

		files: {
			[ `dist/css/main.${ global.config.timestamp }.css` ]: 'less/main.less',
			[ `dist/css/kontakt.${ global.config.timestamp }.css` ]: 'less/kontakt.less'
		}
	}
};
