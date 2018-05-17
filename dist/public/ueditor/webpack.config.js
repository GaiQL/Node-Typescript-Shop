var path=require('path');
var webpack=require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports={
	entry:{
		app:'./ueditor.all.js',
	},
	output:{
		filename:'ueditor.all.min.js',
	},
	plugins: [
			new UglifyJsPlugin()
	]
}
