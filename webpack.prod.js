'use strict';
import paths from './config/paths';

import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import CopyWebpackPlugin from 'copy-webpack-plugin';

import common from './webpack.common.js';

const env = 'production';
process.env.NODE_ENV = env;

module.exports = merge(common, {
	mode: env,
	plugins: [
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', {discardComments: {removeAll: true}}],
			},
			canPrint: true
		}),
		new HtmlWebpackPlugin({
			template: paths.appHtml,
			favicon: './public/favicon.ico',
			minify: {
				// removeComments: true,
				// collapseWhitespace: true,
				// removeRedundantAttributes: true,
				// useShortDoctype: true,
				// removeEmptyAttributes: true,
				// removeStyleLinkTypeAttributes: true,
				// keepClosingSlash: true,
				// minifyJS: true,
				// minifyCSS: true,
				// minifyURLs: true
			},
			inject: 'head'
		}),
		// new HtmlWebpackPlugin({
		// 	template: paths.resolveApp("public/html/report.html"),
		// 	favicon: './public/favicon.ico',
		// 	inject: 'head'
		// }),
		new CopyWebpackPlugin([
			{
				from: paths.appPublic,
				to: paths.appDist
			},
			// {
			// 	from: path.resolve(__dirname, '../src/main.js'),
			// 	to: path.resolve(__dirname, '../build')
			// }
		], {
			ignore: [paths.appHtml],
			copyUnmodified: true
		})
	]
});
