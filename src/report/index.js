import '../../public/html/report.html';
import '../common/style1.css';
import './style.less';
import './base';
import {reportQuery} from './query';
import {reportPreview, reportPrintOperation} from './print';
import {
	changeValue,
	REPORT_FORM_ID_PREFIX,
	REPORT_FORM_PARAM_PREFIX,
	REPORT_FRAME_ID_PREFIX,
	REPORT_SERVER,
	REPORT_SESSION_ID_NAME,
	reportFormIdSelector,
	setFormIdPrefix,
	setFormParamPrefix,
	setFrameIdPrefix,
	setReportServer,
	setSessionIdName,
	setShowPrintTip
} from './base';

if (window.report == null) {
	window.report = {};
}
report = {
	options: function (config) {
		debugger;
		if (config['showPrintTip']) {
			setShowPrintTip(config['showPrintTip']);
		}
		if (config['reportServer']) {
			setReportServer(config['reportServer']);
		}
		if (config['sessionIdName']) {
			setSessionIdName(config['sessionIdName']);
		}
		if (config['formIdPrefix']) {
			setFormIdPrefix(config['formIdPrefix']);
		}
		if (config['formParamPrefix']) {
			setFormParamPrefix(config['formParamPrefix']);
		}
		if (config['frameIdPrefix']) {
			setFrameIdPrefix(config['frameIdPrefix']);
		}
	},
	getReportServer: function () {
		if (!REPORT_SERVER) {
			throw new Error('请设置报表服务地址');
		}
		return REPORT_SERVER;
	},
	getSessionIdName: function () {
		return REPORT_SESSION_ID_NAME;
	},
	getFormIdPrefix: function () {
		return REPORT_FORM_ID_PREFIX;
	},
	getFormParamPrefix: function () {
		return REPORT_FORM_PARAM_PREFIX;
	},
	getFrameIdPrefix: function () {
		return REPORT_FRAME_ID_PREFIX;
	},

	/**
	 * 查询报表
	 * @param reportId 报表ID
	 * @param reportServer 报表服务地址（可选），无时获取全局配置 reportServer
	 * @see #reportQuery
	 */
	query: function (reportId, reportServer) {
		debugger;
		if (reportServer) {
			reportQuery(reportId, reportServer);
		} else {
			reportQuery(reportId, this.getReportServer());
		}
	},

	/**
	 *
	 * @param reportId 报表ID
	 * @param reportlet 切换后报表的名称
	 * @see changeValue
	 */
	switch: function (reportId, reportlet) {
		changeValue('input[name$=\'reportlet\']', reportlet, reportFormIdSelector(reportId));
	},
	/**
	 * 打印报表
	 * @param {String} reportId 报表ID
	 * @param {String} reportServer 报表服务地址(可选)，无时获取全局配置
	 * @see reportPrint
	 */
	print: function (reportId, reportServer = null) {
		debugger;
		if (reportServer) {
			reportPrintOperation(reportId, reportServer);
		} else {
			reportPrintOperation(reportId, this.getReportServer());
		}
	},
	/**
	 * 报表设置预览
	 * @param reportId 报表ID
	 * @param reportServer 报表服务地址(可选)，无时获取全局配置
	 * @see reportPreview
	 */
	preview: function (reportId, reportServer = null) {
		debugger;
		if (reportServer) {
			reportPrintOperation(reportId, reportServer, false);
		} else {
			reportPrintOperation(reportId, this.getReportServer(), false);
		}
	}
};

// const d = new Report();
// d.query('123456');
// d.switch('123456', 'testswitch');
// d.print('123456');
// d.print('123456', true);
// d.preview('123456');
