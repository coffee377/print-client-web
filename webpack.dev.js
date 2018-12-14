'use strict';
import merge from 'webpack-merge';

import paths from './config/paths';

import common from './webpack.common.js';

import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const env = 'development';
process.env.NODE_ENV = env;

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
		new HtmlWebpackPlugin({
			template: paths.resolveApp("public/index.html"),
			inject: 'head'
		}),
		// new HtmlWebpackPlugin({
		// 	template: paths.resolveApp("public/html/report.html"),
		// 	inject: 'head'
		// }),
	]
});
