module.exports = {
	main: {
		files: {
			'dist/css/main.css': [ `dist/css/main.${ global.config.timestamp }.css`]
			,'dist/css/kontakt.css': [ `dist/css/kontakt.${ global.config.timestamp }.css` ]
			,'dist/css/projekty.css': [ `dist/css/projekty.${ global.config.timestamp }.css` ]
			,'dist/css/o-mnie.css': [ `dist/css/o-mnie.${ global.config.timestamp }.css` ]
		}
	}
};
