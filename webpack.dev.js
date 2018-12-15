'use strict';
const env = 'development';
process.env.NODE_ENV = env;

const merge = require('webpack-merge');
const paths = require('./config/paths');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: env,
	devtool: 'inline-source-map',
	devServer: {
		publicPath: paths.publicPath,
		inline: true,
		host: 'localhost',
		port: 9000,
		hot: true,
		open: true,
		noInfo: true,
		contentBase: './public',
		compress: true,
		proxy: {
			'/api': 'http://localhost:3000'
		}
	},

	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		// new HtmlWebpackPlugin({
		// 	template: paths.resolveApp("public/index.html"),
		// 	inject: 'head'
		// }),
		new HtmlWebpackPlugin({
			template: paths.resolveApp("public/html/app.html"),
			inject: 'head'
		}),
	]
});
