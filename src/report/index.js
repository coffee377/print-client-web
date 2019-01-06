import '../../public/html/report.html';
import '../common/style1.css';
import './style.less';
import { reportQuery } from './query';
import { reportPreview, reportPrintOperation } from './print';
import {
	changeValue,
	REPORT_FORM_ID_PREFIX,
	REPORT_FORM_PARAM_PREFIX,
	REPORT_FRAME_ID_PREFIX,
	REPORT_SERVER,
	REPORT_SESSION_ID_NAME,
	reportFormIdSelector,
	reportFrameIdSelector,
	reportVersion,
	setFormIdPrefix,
	setFormParamPrefix,
	setFrameIdPrefix,
	setReportServer,
	setRrportVersion,
	setSessionIdName,
	setShowPrintTip
} from './base';

if (window.report == null) {
	window.report = {};
}
window.report = {
	options(config) {
		debugger;
		if (config) {
			if (config.showPrintTip) {
				setShowPrintTip(config.showPrintTip);
			}
			if (config.reportServer) {
				setReportServer(config.reportServer);
			}
			if (config.reportVersion) {
				setRrportVersion(config.reportVersion);
			}
			if (config.sessionIdName) {
				setSessionIdName(config.sessionIdName);
			}
			if (config.formIdPrefix) {
				setFormIdPrefix(config.formIdPrefix);
			}
			if (config.formParamPrefix) {
				setFormParamPrefix(config.formParamPrefix);
			}
			if (config.frameIdPrefix) {
				setFrameIdPrefix(config.frameIdPrefix);
			}
		}
	},
	getReportServer() {
		if (!REPORT_SERVER) {
			throw new Error('请设置报表服务地址');
		}
		return REPORT_SERVER;
	},
	getReportVersion() {
		return reportVersion;
	},
	getSessionIdName() {
		return REPORT_SESSION_ID_NAME;
	},
	getFormIdPrefix() {
		return REPORT_FORM_ID_PREFIX;
	},
	getFormParamPrefix() {
		return REPORT_FORM_PARAM_PREFIX;
	},
	getFrameIdPrefix() {
		return REPORT_FRAME_ID_PREFIX;
	},

	/**
	 * 查询报表
	 * @param reportId 报表ID
	 * @param reportServer 报表服务地址（可选），无时获取全局配置 reportServer
	 * @see #reportQuery
	 */
	query(reportId, reportServer) {
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
	switch(reportId, reportlet) {
		changeValue("input[name$='reportlet']", reportlet, reportFormIdSelector(reportId));
		// 切换报表是清除 session
		// reportFrameIdSelector(reportId).removeAttr("src");
		// reportFrameIdSelector(reportId).removeClass('bg-color');
		reportFrameIdSelector(reportId).removeAttr(REPORT_SESSION_ID_NAME);
	},
	/**
	 * 打印报表
	 * @param {String} reportId 报表ID
	 * @param {String} reportServer 报表服务地址(可选)，无时获取全局配置
	 * @see reportPrint
	 */
	print(reportId, reportServer = null) {
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
	preview(reportId, reportServer = null) {
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
