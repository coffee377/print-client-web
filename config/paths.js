'use strict';
const packageJson = require('../package');
const path = require('path');
const fs = require('fs');
const url = require('url');

/**
 * 项目根目录
 */
const appDirectory = fs.realpathSync(process.cwd());

/**
 * 获取公开网址，NODE 环境变量优先
 */
const getPublicUrl = process.env.PUBLIC_URL || packageJson.homepage;

/**
 * 根据相对路径获取绝对路径
 * @param relativePath
 * @returns {*|*|string}
 */
const resolveApp = (relativePath) => {
	return path.resolve(appDirectory, relativePath);
};

/**
 * 确保路径地址是否以 "/" 结尾
 * @param inputPath 路径地址
 * @param needsSlash 尾部是否以 "/" 结尾
 * @returns {*}
 */
function ensureSlash(inputPath, needsSlash) {
	const hasSlash = inputPath.endsWith('/');
	if (hasSlash && !needsSlash) {
		return inputPath.substr(0, inputPath.length - 1);
	} else if (!hasSlash && needsSlash) {
		return `${inputPath}/`;
	} else {
		return inputPath;
	}
}

/**
 * 获取服务路径
 * @returns {*}
 */
function getServedPath() {
	const publicUrl = getPublicUrl;
	const servedUrl = process.env.PUBLIC_URL || (publicUrl ? url.parse(publicUrl).pathname : '/');
	return ensureSlash(servedUrl, true);
}

module.exports = {
	resolveApp: function (path) {
		return resolveApp(path);
	},
	dotEnv: resolveApp('.env'),
	appPath: resolveApp('.'),
	appDist: resolveApp('dist'),
	appBuild: resolveApp('build'),
	appPublic: resolveApp('public'),
	appHtml: resolveApp('public/index.html'),
	appIndexJs: resolveApp('src/index.js'),
	appPackageJson: resolveApp('package.json'),
	appSrc: resolveApp('src'),
	yarnLockFile: resolveApp('yarn.lock'),
	testsSetup: resolveApp('src/setupTests.js'),
	proxySetup: resolveApp('src/setupProxy.js'),
	appNodeModules: resolveApp('node_modules'),
	publicUrl: getPublicUrl,
	publicPath: '',
	servedPath: getServedPath(),
};
