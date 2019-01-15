import io from 'socket.io-client';
import { message } from 'antd';
import { getReportSession } from './query';
import { showPrintTip } from './base';

message.config({
	top: 80,
	duration: 3,
	maxCount: 3
});
const printing = () => {
	message.loading('正在打印...');
};

const printSuccess = result => {
	if (result.success) {
		message.success(result.message);
	} else {
		message.error(result.message);
	}
};

const printError = result => {
	if (result.success) {
		message.error(result.message);
	}
};

/**
 * Module variable.
 */
const REPORT_SOCKET_URL = 'http://localhost:10227';

const EVENT_TYPE_CHECKING = 'typeChecking';
const EVENT_BEFORE_PRINT = 'beforePrint';
const EVENT_PRINT = 'print';
const EVENT_PREVIEW = 'preview';
const EVENT_AFTER_PRINT = 'afterPrint';
const EVENT_ERROR_OCCURS = 'errorOccurs';

let isLoadingPrint = false;
let printSocket = io(REPORT_SOCKET_URL);
let printSocketId;

/**
 * Module dependencies.
 */

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
 * 浏览器启动本地打印客户端
 * @param args 启动参数
 */
function protocolUrl(args) {
	debugger;
	window.location.href = `PrintPlus://${args}`;
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
	debugger;
	if (printSocket == null) {
		printSocket = io(REPORT_SOCKET_URL);
	} else {
		printSocket.removeAllListeners();
	}
	debugger;
	isLoadingPrint = printSocket.connected;
	if (!isLoadingPrint) {
		protocolUrl();
	}
	printSocket.on('connect', () => {
		printSocketId = printSocket.id;
		isLoadingPrint = true;
		console.warn(`与打印客户端[${printSocketId}]建立连接`);
	});
	printSocket.on('disconnect', () => {
		debugger;
		isLoadingPrint = false;
		console.warn(`与打印客户端[${printSocketId}]失去连接`);
	});
	/* 触发事件类型检测 */
	printSocket.emit(EVENT_TYPE_CHECKING, JSON.stringify(config));
	/* 打印前事件 */
	printSocket.on(EVENT_BEFORE_PRINT, () => {
		debugger;
		if (showPrintTip && quietPrint) {
			printing();
		}
	});
	printSocket.on(EVENT_PRINT, res => {
		debugger;
		const data = res;
		if (config.sessionID) {
			config.url += `?sessionID=${config.sessionID}&op=fr_applet&cmd=print`;
			for (const configKey in config) {
				data[configKey] = config[configKey];
			}
			print(data);
		}
	});
	printSocket.on(EVENT_AFTER_PRINT, res => {
		debugger;
		if (SHOW_PRINT_TIP && quietPrint) {
			printSuccess(res);
		}
	});
	printSocket.on(EVENT_PREVIEW, res => {
		debugger;
		reportPreview(reportId, res);
		console.log(`打印预览界面${JSON.stringify(res)}`);
	});
	printSocket.on(EVENT_ERROR_OCCURS, res => {
		printError(res);
	});
}

/**
 * Module exports.
 */
export { reportPrintOperation, reportPreview };
