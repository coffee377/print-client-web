'use strict';
const env = 'production';
process.env.NODE_ENV = env;

const paths = require('./config/paths');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
		// new HtmlWebpackPlugin({
		// 	template: paths.appHtml,
		// 	favicon: './public/favicon.ico',
		// 	minify: {
		// 		// removeComments: true,
		// 		// collapseWhitespace: true,
		// 		// removeRedundantAttributes: true,
		// 		// useShortDoctype: true,
		// 		// removeEmptyAttributes: true,
		// 		// removeStyleLinkTypeAttributes: true,
		// 		// keepClosingSlash: true,
		// 		// minifyJS: true,
		// 		// minifyCSS: true,
		// 		// minifyURLs: true
		// 	},
		// 	inject: 'head'
		// }),
		new HtmlWebpackPlugin({
			template: paths.resolveApp('public/html/app.html'),
		}),
		new CopyWebpackPlugin([
			{
				from: paths.appPublic,
				to: paths.appDist
			},
		], {
			ignore: [paths.appHtml],
			copyUnmodified: true
		})
	]
});
