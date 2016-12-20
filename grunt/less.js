module.exports = {
	main: {
		options: {
			yuicompress: false
		},

		files: {
			[ `dist/css/main.${ global.config.timestamp }.css` ]: 'less/main.less',
			[ `dist/css/kontakt.${ global.config.timestamp }.css` ]: 'less/kontakt.less',
			[ `dist/css/projekty.${ global.config.timestamp }.css` ]: 'less/projekty.less',
			[ `dist/css/o-mnie.${ global.config.timestamp }.css` ]: 'less/o-mnie.less'
		}
	}
};
