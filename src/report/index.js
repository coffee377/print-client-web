import './style.less';
import './base';
import {reportQuery,setParamsPrefix} from './query';
import {reportPreview, reportPrint} from './print';
import {changeValue, REPORT_FORM_ID_PREFIX,reportFormIdSelector} from './base';
import {Report} from './report.ts';

let _reportServer = null;

/**
 * 获取配置的报表服务地址
 * @returns {String}
 */
const getSettingReportServer = () => {
	let server;
	debugger;
	if (_reportServer) {
		server = _reportServer;
	} else {
		throw new Error('请设置报表服务地址');
	}
	return server;
};

if (window.report == null) {
	window.report = {};
}
report = {
	/**
	 * 设置报表服务器地址（优先级最高）
	 * @param reportServer
	 */
	setReportServer: function (reportServer) {
		debugger;
		_reportServer = reportServer;

	},
	getReportServer: function () {
		return _reportServer;
	},
	/**
	 * 设置表单参数前缀（优先级最高）
	 * @param paramsPrefix
	 */
	setParamsPrefix: function (paramsPrefix) {
		setParamsPrefix(paramsPrefix);
	},
	/**
	 * 查询报表
	 * @param reportId 报表ID
	 * @param reportServer 报表服务地址（可选）
	 * @see #reportQuery
	 */
	query: function (reportId, reportServer) {
		debugger;
		if (reportServer) {
			reportQuery(reportId, reportServer);
		} else {
			reportQuery(reportId, getSettingReportServer());
		}
	},
	/**
	 *
	 * @param reportId
	 * @param reportlet
	 * @see changeValue
	 */
	switch: function (reportId, reportlet) {
		changeValue('input[name$=\'reportlet\']', reportlet, reportFormIdSelector(reportId));
	},
	/**
	 * 打印报表
	 * @param reportId 报表ID
	 * @see reportPrint
	 */
	print: function (reportId) {
		debugger;
		reportPrint(reportId,this.getReportServer());
	},
	/**
	 * 报表设置预览
	 * @param reportId 报表ID
	 * @param reportServer 报表服务地址
	 * @see reportPreview
	 */
	preview: function (reportId, reportServer) {
		reportPreview(reportId, reportServer);
	}
};

// const d = new Report();
// d.query('123456');
// d.switch('123456', 'testswitch');
// d.print('123456');
// d.print('123456', true);
// d.preview('123456');
