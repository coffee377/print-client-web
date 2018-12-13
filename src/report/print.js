import io from 'socket.io-client';
import {getReportSession} from './query';

/**
 * Module variable.
 */
const REPORT_SOCKET_URL = 'http://localhost:10227';

const EVENT_NGINX_PROXY = 'nginxProxy';
const EVENT_ALIVE_CHECKING = 'aliveChecking';
const EVENT_GET_CONFIG_DATA = 'getConfigData';
const EVENT_SET_CONFIG_DATA = 'setConfigData';
const EVENT_BEFORE_PRINT = 'beforePrint';
const EVENT_START_PRINT = 'startPrint';
const EVENT_AFTER_PRINT = 'afterPrint';
const EVENT_ERROR_OCCURS = 'errorOccurs';

let isLoadingPrint = false;
let printSocket;

/**
 * Module dependencies.
 */


/**
 * 根据报表ID 打印报表
 * @param {String} reportId 报表ID
 * @param {String} reportServer 报表服务地址
 * @param {boolean} quietPrint 是否静默打印
 */
function reportPrint(reportId, reportServer, quietPrint = true) {
	debugger;
	const session = getReportSession(reportId);
	if (!session) {
		return;
	}
	//点击打印时的实际配置
	let config = {
		sessionID: session,
		printerName: '',
		quietPrint: quietPrint,
		orientation: 1,
		url: reportServer
	};
	if (printSocket == null) {
		printSocket = io(REPORT_SOCKET_URL);
	} else {
		printSocket.removeAllListeners();
		if (!printSocket.connected) {
			// alert('PrintPlus未启动');
			// startPrintPlus();
			printSocket.connect();
		}
	}

	// if (printSocket.connected) {
	// 	isLoadingPrint = true;
	// 	alert('PrintPlus启动成功');
	// } else {
	// 	debugger;
	// 	// printSocket.destroy();
	// 	// printSocket = null;
	// 	debugger;
	// 	isLoadingPrint = false;
	// 	alert('PrintPlus启动失败');
	// }
	// if (isLoadingPrint) {
	printSocket.on('connect', function () {
		console.warn(`与打印客户端[${printSocket.id}]建立连接`);
	});
	printSocket.on('disconnect', function () {
		console.warn(`与打印客户端[${printSocket.id}]失去连接`);
	});
	printSocket.emit(EVENT_GET_CONFIG_DATA, JSON.stringify({quietPrint: quietPrint}));
	printSocket.on(EVENT_GET_CONFIG_DATA, function (data) {
		debugger;
		const msg = JSON.stringify(data);
	});
	printSocket.on(EVENT_BEFORE_PRINT, function () {
		// printSocket.destroy();
	});
	printSocket.on(EVENT_AFTER_PRINT, function () {

	});

	printSocket.on(EVENT_START_PRINT, function (data) {
		if (quietPrint) {
			if (config.sessionID) {
				config.url += `?sessionID=${config.sessionID}&op=fr_applet&cmd=print`;
				print(reportId, config);
			}
		} else {
			// TODO: 2018/12/12 0012 13:55 显示对话框代码
			config.url += `?sessionID=${config.sessionID}&op=fr_print&cmd=no_client&preview=true`;
			// if (config.sessionID) {
			// 	window.open(`${reportServer}?op=fr_print&cmd=no_client&preview=true&sessionID=${config.sessionID}`, 'Preview');
			// }
			reportPreview(reportId, reportServer);
		}
	});
	printSocket.on(EVENT_ERROR_OCCURS, function (data) {
		alert('发生错误：' + JSON.stringify(data));
	});
}

/**
 * 打印
 * @param reportId 报表ID
 * @param config 打印配置
 */
function print(reportId, config) {
	printSocket.emit(EVENT_START_PRINT, JSON.stringify(config));
}

/**
 * 启动打印客户端
 */
function startPrintPlus() {
	console.log('The PrintPlus client is starting');

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

