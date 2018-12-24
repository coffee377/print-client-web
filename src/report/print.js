import io from 'socket.io-client';
import { getReportSession } from './query';
import { SHOW_PRINT_TIP } from './base';
// import {message} from 'antd';
// message.config({
// 	top: 100,
// 	duration: 2,
// 	maxCount: 3,
// });
// const printing = () => {
// 	message.loading('正在打印...', 3);
// 	// Dismiss manually and asynchronously
// 	// setTimeout(hide, 2500);
// };
//
// const printSuccess = () => {
// 	message.success('打印完成', 2);
// };
//
// const printError = (msg) => {
// 	message.error(msg, 2);
// };

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
let printSocket = io(REPORT_SOCKET_URL);
let printSocketId = printSocket.id;

/**
 * Module dependencies.
 */

/**
 * 启动打印客户端
 * @returns {boolean} 启动客户端是否成功
 */
function startPrintPlus() {
	// TODO: 2018/12/14 0014 9:07 启动客户端
	debugger;
	printSocket.connect();
	if (printSocket && printSocket.connected) {
		console.log('The PrintPlus client is started');
		alert('PrintPlus启动成功');
		isLoadingPrint = true;
	} else {
		debugger;
		// printSocket.destroy();
		// printSocket = null;
		isLoadingPrint = false;
		console.warn('The PrintPlus client boot failed');
		alert('PrintPlus启动失败');
	}
}

/**
 * 打印
 * @param config 打印配置
 */
function print(config) {
	printSocket.emit(EVENT_PRINT, JSON.stringify(config));
}

/**
 * 根据报表ID 预览设置
 * @param reportId 报表ID
 * @param previewConfig 打印预览数据
 */
function reportPreview(reportId, previewConfig) {
	debugger;
	window.open(previewConfig.previewUrl, `Preview${reportId}`);
}

/**
 * 根据报表ID 执行报表
 * @param {String} reportId 报表ID
 * @param {String} reportServer 报表服务地址
 * @param {boolean} quietPrint 是否静默打印
 */
function reportPrintOperation(reportId, reportServer, quietPrint = true) {
	debugger;
	const session = getReportSession(reportId);
	if (!session) {
		return;
	}
	// 点击打印时的实际配置
	const config = { sessionID: session, quietPrint, url: reportServer };
	if (printSocket == null) {
		printSocket = io(REPORT_SOCKET_URL);
	} else {
		printSocket.removeAllListeners();
	}
	isLoadingPrint = printSocket.connected;
	if (!isLoadingPrint) {
		alert('PrintPlus未启动');
		startPrintPlus();
	}
	if (isLoadingPrint) {
		printSocket.on('connect', () => {
			printSocketId = printSocket.id;
			console.warn(`与打印客户端[${printSocketId}]建立连接`);
		});
		printSocket.on('disconnect', () => {
			debugger;
			console.warn(`与打印客户端[${printSocketId}]失去连接`);
		});
		/* 获取配置 */
		printSocket.emit(EVENT_TYPE_CHECKING);
		printSocket.on(EVENT_BEFORE_PRINT, () => {
			if (SHOW_PRINT_TIP && quietPrint) {
				alert('开始打印');
				// printing();
			}
			printSocket.emit(EVENT_BEFORE_PRINT, JSON.stringify(config));
		});
		printSocket.on(EVENT_PRINT, data => {
			const tmpData = data;
			if (config.sessionID) {
				config.url += `?sessionID=${config.sessionID}&op=fr_applet&cmd=print`;
				for (const configKey in config) {
					tmpData[configKey] = config[configKey];
				}
				print(tmpData);
			}
		});
		printSocket.on(EVENT_AFTER_PRINT, data => {
			if (SHOW_PRINT_TIP && quietPrint) {
				alert('打印结束');
				// printSuccess();
			}
		});
		printSocket.on(EVENT_PREVIEW, data => {
			reportPreview(reportId, data);
			console.log(`打印预览界面${JSON.stringify(data)}`);
		});
		printSocket.on(EVENT_ERROR_OCCURS, data => {
			alert(`发生错误：${JSON.stringify(data)}`);
		});
	}
}

/**
 * Module exports.
 */
export { reportPrintOperation, reportPreview };
