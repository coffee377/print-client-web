const env = 'development';
process.env.NODE_ENV = env;

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const paths = require('./config/paths');
const common = require('./webpack.common.js');

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
			template: paths.resolveApp('public/index.html')
		}),
		new HtmlWebpackPlugin({
			template: paths.resolveApp('public/html/app.html'),
			filename: 'app.html'
		}),
		new HtmlWebpackPlugin({
			template: paths.resolveApp('public/html/report.html'),
			filename: 'report.html',
			inject: 'head'
		})
	]
});
