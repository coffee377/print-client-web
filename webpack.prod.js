'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', {discardComments: {removeAll: true}}],
			},
			canPrint: true
		})
	]
});
