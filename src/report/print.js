import io from 'socket.io-client';
import {getReportSession} from './query';

/**
 * Module variable.
 */
const reportSocketUrl = 'http://localhost:9092';

const EVENT_NGINX_PROXY = 'nginxProxy';
const EVENT_ALIVE_CHECKING = 'aliveChecking';
const EVENT_GET_CONFIG_DATA = 'getConfigData';
const EVENT_BEFORE_PRINT = 'beforePrint';
const EVENT_START_PRINT = 'startPrint';
const EVENT_AFTER_PRINT = 'afterPrint';

let isLoadingPrint = false;
let printSocket;
// const reportSocket = io('http://localhost:9092');

let printLoadingDialog;
let printPreviewTimer;
let floatRegexText = '^\\d+(\\.\\d+)?$';

/**
 * Module dependencies.
 */


/**
 * 根据报表ID 打印报表
 * @param {String} reportId 报表ID
 * @param {boolean} showDialog 显示对话框
 */
function reportPrint(reportId,showDialog = false) {
	debugger;
	//点击打印时的实际配置
	let config = {};
	console.log('print init');
	if (printSocket == null) {
		printSocket = io(reportSocketUrl);
	} else {
		printSocket.removeAllListeners();
		if (!printSocket.connected) {
			printSocket.connect();
		}
	}
	isLoadingPrint = true;
	printSocket.on('connect', function () {
		console.warn(`与打印客户端[${printSocket.id}]建立连接`);
	});
	printSocket.on('disconnect', function () {
		console.warn(`与打印客户端[${printSocket.id}]失去连接`);
	});
	printSocket.on(EVENT_ALIVE_CHECKING, function () {
		if (isLoadingPrint) {
			isLoadingPrint = false;
			debugger;
			printSocket.emit(EVENT_GET_CONFIG_DATA, JSON.stringify({a: true, b: 2, c: '3'}));
		}
	});
	printSocket.on(EVENT_GET_CONFIG_DATA, function (e) {
		debugger;
		const data = e.message;
		console.log("获取客户端配置成功：" + JSON.stringify(data));
		//根据是否显示对话框在更改配置文件
		//不显示对话框，直接拿客户端配置打印
		//显示对话框，获取用户设置新值再打印
		// if (showDialog) {
		//
		// } else {
		//
		// }
		if (data.isQuietPrint) {
			// TODO: 2018/12/11 0011 17:05
		} else {
			/*修正打印机为客户端默认打印机*/
			if (data.printerName) {
				config.printerName = data.printerName;
			} else {
				config.printerName = '';
			}
		}
	});
	printSocket.on(EVENT_BEFORE_PRINT, function () {
		// printSocket.destroy();
	});
	printSocket.on(EVENT_AFTER_PRINT, function () {

	});
	//页面触发存活检验
	printSocket.emit(EVENT_ALIVE_CHECKING);
}

/**
 *
 * @param reportId
 * @param config 实际打印打印配置
 */
function print(reportId,config) {
	printSocket.emit(EVENT_START_PRINT, JSON.stringify(config));
}

/**
 * 根据报表ID 预览设置
 * @param reportId 报表ID
 * @param reportServer 报表服务地址
 */
function reportPreview(reportId, reportServer) {
	debugger;
	const reportSession = getReportSession(reportId);
	if (reportSession) {
		window.open(`${reportServer}?op=fr_print&cmd=no_client&preview=true&sessionID=${reportSession}`, 'Preview');
	}
}

/**
 * Module exports.
 */
export {reportPrint, reportPreview};

