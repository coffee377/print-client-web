import io from 'socket.io-client';
import {getReportSession} from './query';

/**
 * Module variable.
 */
const REPORT_SOCKET_URL = 'http://localhost:10227';

const EVENT_TYPE_CHECKING = 'typeChecking';
const EVENT_GET_CONFIG_DATA = 'getConfigData';
const EVENT_SET_CONFIG_DATA = 'setConfigData';
const EVENT_BEFORE_PRINT = 'beforePrint';
const EVENT_PRINT = 'print';
const EVENT_PREVIEW = 'preview';
const EVENT_AFTER_PRINT = 'afterPrint';
const EVENT_ERROR_OCCURS = 'errorOccurs';

let isLoadingPrint = false;
let printSocket;
let printSocketId;

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
		quietPrint: quietPrint,
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
		printSocketId = printSocket.id;
		console.warn(`与打印客户端[${printSocketId}]建立连接`);
	});
	printSocket.on('disconnect', function () {
		console.warn(`与打印客户端[${printSocketId}]失去连接`);
	});
	/*获取配置*/
	printSocket.emit(EVENT_TYPE_CHECKING);
	printSocket.on(EVENT_BEFORE_PRINT, function () {
		// printSocket.destroy();
		alert('打印之前要干的事');
		printSocket.emit(EVENT_BEFORE_PRINT, JSON.stringify({quietPrint: quietPrint}));
	});
	printSocket.on(EVENT_PRINT, function (data) {
		if (config.sessionID) {
			config.url += `?sessionID=${config.sessionID}&op=fr_applet&cmd=print`;
			for (let configKey in config) {
				data[configKey] = config[configKey];
			}
			print(data);
		}
	});
	printSocket.on(EVENT_AFTER_PRINT, function (data) {
		alert('打印之后要干的事' + JSON.stringify(data));
	});
	printSocket.on(EVENT_PREVIEW, function (data) {
		alert('打印预览界面' + JSON.stringify(data));
	});
	printSocket.on(EVENT_ERROR_OCCURS, function (data) {
		alert('发生错误：' + JSON.stringify(data));
	});
}

/**
 * 打印
 * @param config 打印配置
 */
function print(config) {
	printSocket.emit(EVENT_PRINT, JSON.stringify(config));
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

