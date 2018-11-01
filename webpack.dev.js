'use strict';

const merge = require('webpack-merge');
const paths = require('./config/paths');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		publicPath: paths.publicPath,
		inline: true,
		host: 'localhost',
		port: 9000,
		hot: true,
		open: true,
		noInfo: true,
		contentBase: './dist',
		compress: true,
		proxy: {
			'/api': 'http://localhost:3000'
		}
	},

	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
});
