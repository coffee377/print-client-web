'use strict';

const path = require('path');
const paths = require('./config/paths');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoPreFixer = require('autoprefixer')();

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
	throw new Error(
		'The NODE_ENV environment variable is required but was not specified.'
	);
} else {
	console.log('NODE_ENV：', NODE_ENV);
}
const devMode = (NODE_ENV !== 'production');

const getPublicPath = (relativePath) => {
	return relativePath ? {publicPath: relativePath} : {};
};

const cssExtractLoader = () => {
	return devMode ? 'style-loader' : {
		/*CSS 内使用相对路径*/
		loader: MiniCssExtractPlugin.loader, options: getPublicPath('../')
	};
};
module.exports = {
	entry: {
		main: './src/index',
		// app: './src/app/index',
		common: './src/common/index',
		report: './src/report/index'
	},
	output: {
		publicPath: paths.publicPath,
		path: paths.appDist,
		filename: 'js/[name].js',
	},
	/*使用 jQuery*/
	externals: {
		'jquery': 'window.jQuery'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.less', '.sass', '.html']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [cssExtractLoader, 'css-loader', {
					loader: 'postcss-loader',
					options: {
						plugins: [AutoPreFixer]
					}
				}],
				include: [paths.appSrc, paths.resolveApp('node_modules/antd')],
			},
			{
				test: /\.less$/,
				use: [cssExtractLoader, 'css-loader', {
					loader: 'postcss-loader',
					options: {
						plugins: [AutoPreFixer]
					}
				}, {loader: 'less-loader', options: {javascriptEnabled: true}}],
				include: [paths.appSrc, paths.resolveApp('node_modules/antd')],
			},
			{
				test: /\.(sa|sc)ss$/,
				use: [cssExtractLoader, 'css-loader', {
					loader: 'postcss-loader',
					options: {
						plugins: [AutoPreFixer]
					}
				}, 'sass-loader'],
				include: paths.appSrc,
				exclude: paths.appNodeModules
			},
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				include: paths.appSrc,
				exclude: paths.appNodeModules,
				use: [
					{
						loader: 'eslint-loader',
						options: {
							fix: true
						}
					}
				]
			},
			{
				test: /\.jsx?$/,
				include: [paths.appSrc],
				exclude: paths.appNodeModules,
				loader: 'babel-loader',
			},
			/*用于HTML页面热更新*/
			{
				test: /\.(htm|html)$/,
				use: ['raw-loader']
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'img/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.tsx?$/,
				include: paths.appSrc,
				exclude: paths.appNodeModules,
				use: {
					loader: 'ts-loader'
				}
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: '[id].css',
		})
	],
};
