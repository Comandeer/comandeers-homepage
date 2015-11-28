module.exports = function(grunt)
{
	String.prototype.repeat=function(count) 
	{
		if(count<1)
			return '';
		var result=''
		,pattern=this.valueOf();
		while(count>0)
		{
			if(count&1)
				result+=pattern;
			count>>=1
			,pattern+=pattern;
		}
		return result;
	};

	global.config = require('./config');

	require('time-grunt')(grunt);
	require('load-grunt-config')(grunt, {
		jitGrunt: {
			customTasksDir: './grunt/custom'
		}
	});
};
