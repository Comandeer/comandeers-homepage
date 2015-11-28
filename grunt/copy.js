module.exports = {
	main: {
		files: [
			// includes files within path
			{
				expand: true
				,flatten: false
				,cwd: 'resources/images/'
				,src: [
					'*/**'
				]
				,dest: 'dist/images/'
			}
			,{
				expand: true
				,flatten: true
				,src: [
					'resources/icons/**'
				]
				,dest: 'dist'
				,filter: 'isFile'
			}
			,{
				expand: true
				,flatten: true
				,src: [
					'resources/fonts/**'
				]
				,dest: 'dist/fonts'
				,filter: 'isFile'
			}
		]
	}
};
