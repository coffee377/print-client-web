'use strict';

const path = require('path');
const paths = require('./config/paths');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoPreFixer = require('autoprefixer')();

const NODE_ENV = process.env.NODE_ENV.trim();
if (!NODE_ENV) {
	throw new Error(
		'The NODE_ENV environment variable is required but was not specified.'
	);
} else {
	console.log('NODE_ENV：', NODE_ENV);
}
const devMode = (NODE_ENV !== 'prod');

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
		index: './src/index',
		report: './src/script/report'
	},
	output: {
		publicPath: paths.publicPath,
		path: paths.appDist,
		filename: 'js/[name].js',
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
				include: paths.appSrc,
				exclude: paths.appNodeModules
			},
			{
				test: /\.less$/,
				use: [cssExtractLoader, 'css-loader', {
					loader: 'postcss-loader',
					options: {
						plugins: [AutoPreFixer]
					}
				}, 'less-loader'],
				include: paths.appSrc,
				exclude: paths.appNodeModules
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
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			{
				test: /\.js$/,
				include: paths.appSrc,
				exclude: paths.appNodeModules,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
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
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: paths.appHtml,
			favicon: './public/favicon.ico',
			minify: {
				// removeComments: true,//删除注释
				// collapseWhitespace: true//删除空格
				minifyJS: false
			},
			inject: 'body'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: '[id].css',
		})
	],
};
